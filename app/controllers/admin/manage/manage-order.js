import Controller from '@ember/controller';

export default Controller.extend({
	showSuccess: false,
	groupedItems: function () {
		let controller = this;
		var result = [];

		controller.get('model.items').forEach(function (item) {
			item.get('itemtype').then((itemtype) => {
				var hasType = result.findBy('type', itemtype.get('partname'));
				if (!hasType) {
					result.pushObject(Ember.Object.create({
						type: itemtype.get('partname'),
						contents: []
					}));
				}

				result.findBy('type', itemtype.get('partname')).get('contents').pushObject(item);
			})
		});

		return result;
	}.property('content.[]'),
	actions: {
		changeFulfilled(date) {
			this.set('model.fulfilledon', date);
		},
		changeReturned(date) {
			this.set('model.returnedon', date);
		},
		update() {
			this.model.save();
			this.toggleProperty('showSuccess');
			setTimeout(() => { this.toggleProperty('showSuccess'); }, 5000);
		},
		notMissing(item) {
			item.set('missingpart', null);
			item.set('checkedoutto', null);
			item.save();
		},
		remove() {
			this.model.destroyRecord();
			this.transitionToRoute('admin.manage')
		}
	}
});
