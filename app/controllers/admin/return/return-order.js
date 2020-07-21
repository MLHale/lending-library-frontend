import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import EmberObject from '@ember/object';

export default Controller.extend({
	store: service('store'),
	groupedItems: computed('model.items', function () {
		let controller = this;
		var result = [];

		controller.get('model.items').forEach(function (item) {
			item.get('itemtype').then((itemtype) => {
				var hasType = result.findBy('type', itemtype.get('partname'));
				if (!hasType) {
					result.pushObject(EmberObject.create({
						type: itemtype.get('partname'),
						contents: []
					}));
				}

				result.findBy('type', itemtype.get('partname')).get('contents').pushObject(item);
			})
		});
		return result;
	}),

	showSuccess: false,
	showWarning: false,
	warningMessage: '',
	actions: {
		return(checkout) {
			let controller = this;
			let needWarning = false;
			let totalMissing = 0;

			checkout.set('returnedon', new Date());
			checkout.save();

			controller.get('groupedItems').forEach(item => {

				let select = document.getElementById('select-' + item.contents[0].id);
				let numReturned = select.value;

				// If there are missing items of a type
				if(numReturned < item.contents.length){
					needWarning = true;
					let missing = (item.contents.length - numReturned);
					totalMissing += missing
					console.log('Missing ' + missing + ' ' + item.type + '\'s');

					// Loop through all the items
					for (let i = 0; i < item.contents.length; i++) {

						// Set the number of missing items as missing
						if (i < missing){
							controller.get('store').findRecord('item', item.contents[i].get('id')).then((missing) => {
								missing.set('missingpart', checkout);
								missing.save();
							});
						} else {
							// Free the rest of the items from the checkout
							item.contents[i].set('checkedoutto', null);
							item.contents[i].save();
						}
					}
				} else {
					// There's no missing items of this type, so release the items
					for (let i = 0; i < item.contents.length; i++) {
						item.contents[i].set('checkedoutto', null);
						item.contents[i].save();
					}
				}
			});

			if(needWarning) {
				controller.set('warningMessage', ('There ' + ((totalMissing > 1) ? 'are' : 'is') + ' ' + totalMissing + ' item' + ((totalMissing > 1) ? 's' : '') + ' missing that needs to be returned.'));
				this.toggleProperty('showWarning');
				setTimeout(() => {
					this.transitionToRoute('admin.manage.manage-order', checkout)
				}, 5000);
			} else {
				this.toggleProperty('showSuccess');
				setTimeout(() => {
					this.toggleProperty('showSuccess');
					checkout.destroyRecord();
				}, 5000);
			}

		}
	}
});
