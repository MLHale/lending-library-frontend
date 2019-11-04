import Service from '@ember/service';
import { A } from '@ember/array';
import ArrayProxy from '@ember/array/proxy';

export default Service.extend({

  // { itemtype: <Itemtype>, quantity: <int>, available: <int> }
  cart: null,
  length: 0,

  // Restore cart from local storage on init
  init() {
    this._super(...arguments);
    this.set('cart', (localStorage.getItem('cart')) ? ArrayProxy.create({ content: A(JSON.parse(localStorage.getItem('cart')))}) : ArrayProxy.create({ content: A([])}));
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

  // Adds an item type to the cart
  add(itemtype) {
    let item = this.get('cart').filterBy('itemtype.partname', itemtype.get('partname'));
    
    if(item.length) {
      console.log('Incremented ' + itemtype.get('partname') + ' quantity.');
      item.set('0.quantity', parseInt(item.get('0.quantity') + 1));
    } else {
      console.log('Added ' + itemtype.get('partname') + ' to cart.');
      this.get('cart').pushObject({'itemtype': itemtype, 'quantity': 1, available: itemtype.get('items.length')}); // TODO: FIX THIS
    }

    localStorage.setItem('cart', JSON.stringify(this.get('cart').toArray()));
    this._updateLength();
  },

  // Removes an itemtype from the cart
  remove(itemtype) {
    let removeItem = this.get('cart').filterBy('itemtype.partname', itemtype.partname);
    this.get('cart').removeObjects(removeItem);
    localStorage.setItem('cart', JSON.stringify(this.get('cart').toArray()));
    this._updateLength();
  },

  // Sets a number of itemtypes in the cart
  setQuantity(itemtype, quantity) {
    let items = this.get('cart').filterBy('itemtype.partname', itemtype.partname);
    if(items.length) {
      items.set('0.quantity', parseInt(quantity));
    } else {
      this.get('cart').pushObject({'itemtype' : itemtype, 'quantity' : quantity});
    }

    localStorage.setItem('cart', JSON.stringify(this.get('cart').toArray()));
    this._updateLength();
    console.log('Set ' + itemtype.partname + ' quantity to ' + quantity + '.');
  },

  // Gets the quantity of an itemtype currently in the cart
  getQuantity(itemtype) {
    let item = this.get('cart').filterBy('itemtype.partname', itemtype.get('partname'));
    return (item.length) ? item.get('0.quantity') : 0;
  },

  // Empty's the cart
  empty() {
    localStorage.clear();
    this.get('cart').clear();
    this._updateLength();
  },

  
});