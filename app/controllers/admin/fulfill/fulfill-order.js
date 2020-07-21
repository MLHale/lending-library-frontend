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
				itemtype.get('category').then((category) => {
					var hasType = result.findBy('type', itemtype.get('partname'));
					if (!hasType) {
						result.pushObject(EmberObject.create({
							type: itemtype.get('partname'),
							category: category.get('categoryname'),
							contents: []
						}));
					}

					result.findBy('type', itemtype.get('partname')).get('contents').pushObject(item);
				})
				
			})
		});

		return result;
	}),

	showSuccess: false,
	showError: false,

	actions: {
		complete(checkout) {
			
			let checkboxes = document.getElementsByTagName('input');
			let checked = true;

			for(let i = 0; i < checkboxes.length; i++) {
				if(!(checkboxes[i].checked)) {
					checked = false;
					this.toggleProperty('showError');
					setTimeout(() => { this.toggleProperty('showError'); }, 5000);
					break;
				}
			}

			if(checked) {
				checkout.set('fulfilledon', new Date());
				checkout.save();

				this.toggleProperty('showSuccess');
				setTimeout(() => { this.toggleProperty('showSuccess'); }, 5000);
			}
		},
	}
});
