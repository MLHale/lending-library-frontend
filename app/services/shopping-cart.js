import Service, { inject as service } from '@ember/service';
import { A } from '@ember/array';
import ArrayProxy from '@ember/array/proxy';

export default Service.extend({

	store: service(),

	// { itemtype: <Itemtype>, quantity: <int>, available: <int>, id: <int> }
	cart: null,

	// Length is used for the total number of items in the cart to display in the navbar
	length: 0,

	// Restore cart from local storage on init
	init() {
		this._super(...arguments);
		this.set('cart', (localStorage.getItem('cart')) ? ArrayProxy.create({ content: A(JSON.parse(localStorage.getItem('cart')))}) : ArrayProxy.create({ content: A([])}));
		this._updateAvailable();
		this._updateLength();
	},

	// Gets the total number of items in the cart and updates length
	_updateLength() {
		let cart = JSON.parse(localStorage.getItem('cart'));
		if(cart != null) {
		let sum = 0;
		for(let i = 0; i < cart.length; i++) {
			let quantity = cart[i].quantity;
			sum += quantity;
		}
		this.set('length', parseInt(sum));
		} else {
		this.set('length', 0);
		}
		
	},

	_updateAvailable() {
		let service = this;
		let cart = JSON.parse(localStorage.getItem('cart'));
		if(cart != null) {
			for(let i = 0; i < cart.length; i++) {
				service.get('store').query('item', { 'itemtype': cart[i].id }).then((items) => {
					let available = 0;
					items.forEach(item => {
						if (item.get('checkedoutto.id') == null) {
							available += 1;
						}
					});
					let item = service.get('cart').filterBy('itemtype.partname', cart[i].itemtype.partname);
					item.set('0.available', available);
					localStorage.setItem('cart', JSON.stringify(this.cart.toArray()));
					this._updateLength();
				});
			}
		}
	},

	// Adds an item type to the cart
	add(itemtype) {
		let service = this;
		let item = this.cart.filterBy('itemtype.partname', itemtype.get('partname'));
		
		// If there is already one of those types of items in your cart...
		if(item.length) {
			if((item.get('0.quantity') + 1) <= item.get('0.available')){
				item.set('0.quantity', parseInt(item.get('0.quantity') + 1));
				localStorage.setItem('cart', JSON.stringify(this.cart.toArray()));
				this._updateLength();
			} else {
				console.log('An unexpected error occurred. You are not able to add more items then there are available into your cart.');
			}
		} else {
			// If there's none (aka its a new itemtype)
			service.get('store').query('item', { 'itemtype': itemtype.get('id'), 'checkedoutto.id': null }).then((items) => {
				let available = 0;
				items.forEach(item => {
					if (item.get('itemtype.partname') == itemtype.get('partname') && item.get('checkedoutto.id') == null) {
						available += 1;
					}
				});
				service.cart.pushObject({ 'itemtype': itemtype, 'quantity': 1, 'available': available, 'id': itemtype.get('id') });
				localStorage.setItem('cart', JSON.stringify(this.cart.toArray()));
				this._updateLength();
			});
		}
	},

	// Removes an itemtype from the cart
	remove(itemtype) {
		let removeItem = this.cart.filterBy('itemtype.partname', itemtype.partname);
		this.cart.removeObjects(removeItem);
		localStorage.setItem('cart', JSON.stringify(this.cart.toArray()));
		this._updateLength();
	},

	// Sets a number of itemtypes in the cart
	setQuantity(itemtype, quantity) {
		let service = this;
		let items = service.cart.filterBy('itemtype.partname', itemtype.partname);
		if(items.length) {
			if(parseInt(quantity) <= items.get('0.available')){
				items.set('0.quantity', parseInt(quantity));
				localStorage.setItem('cart', JSON.stringify(this.cart.toArray()));
				this._updateLength();
			} else {
				console.log('An unexpected error has occurred. You are not able to add more items then there are available into your cart.');
			}
		} else {
			service.get('store').query('item', { 'itemtype.partname': itemtype.partname }).then((items) => {
				let available = 0;
				let id = null;
				items.forEach(item => {
					if (item.get('itemtype.partname') == itemtype.partname && item.get('checkedoutto.id') == null) {
						available += 1;
						if(id == null){
							id = item.get('itemtype.id');
						}
					}
				});
				service.cart.pushObject({ 'itemtype': itemtype, 'quantity': quantity, 'available': available, 'id': id });
				localStorage.setItem('cart', JSON.stringify(this.cart.toArray()));
				this._updateLength();
			});
		}
	},

	// Gets the quantity of an itemtype currently in the cart
	getQuantity(itemtype) {
		let item = this.cart.filterBy('itemtype.partname', itemtype.get('partname'));
		return (item.length) ? item.get('0.quantity') : 0;
	},

	// Empty's the cart
	empty() {
		localStorage.clear();
		this.cart.clear();
		this._updateLength();
	},

});