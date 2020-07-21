import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
	store: service('store'),
	cart: service('shopping-cart'),
	totalAvailable: 0,
	available: 0,
	init() {
		this._super(...arguments);

		this._getItems();
	},
	_getItems() {
		let component = this;
		this.store.query('item', { 'itemtype': this.itemtype.get('id') }).then((items) => {
			// because this is async you need to guard against the component 
			// being destroyed before the api call has finished because 
			// because `this.set` will throw an error.
			if (this.isDestroyed) { return; }

			items.forEach(item => {
				if (item.get('itemtype.id') == this.itemtype.get('id') && item.get('checkedoutto.id') == null) {
					component.incrementProperty('available')
					component.incrementProperty('totalAvailable')
				}
			});

			component.decrementProperty('available', this.cart.getQuantity(this.itemtype));

		});
	},
	actions: {
		add() {
			if (this.cart.getQuantity(this.itemtype) < this.totalAvailable) {
				this.cart.add(this.itemtype);
				this.decrementProperty('available');
				this.get('callSuccess')();
			} else {
				this.get('callDanger')();
			}
		}
	}
});