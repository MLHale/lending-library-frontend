import Component from '@ember/component';

export default Component.extend({
	showModal: false,
	groupedItems: function () {
		let component = this;
		var result = [];

		component.get('order.items').forEach(function (item) {
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
		showOrder() {
			this.set('showModal', true);
		},
		
		hideOrder() {
			this.set('showModal', false);
		},

		cancelOrder(checkout) {
			checkout.destroyRecord();
		}

	}
});