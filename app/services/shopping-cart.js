import Service from '@ember/service';
import { A } from '@ember/array';
import ArrayProxy from '@ember/array/proxy';
import { inject as service } from '@ember/service';

export default Service.extend({

  store: service(),

  // { itemtype: <Itemtype>, quantity: <int>, available: <int> }
  cart: null,
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
        // let quantity = cart[i].quantity;
        service.get('store').query('item', { 'itemtype.partname': cart[i].itemtype.partname } ).then(results => results.filter((item) => {
          return item.checkedoutto.content === null;
        })).then((res) => {
          console.log("There are " + res.length + " " + cart[i].itemtype.partname + "'s available ")
          let item = service.get('cart').filterBy('itemtype.partname', cart[i].itemtype.partname);
          item.set('0.available', res.length);
          localStorage.setItem('cart', JSON.stringify(this.get('cart').toArray()));
        });
      }
    }
  },

  // Adds an item type to the cart
  add(itemtype) {
    let item = this.get('cart').filterBy('itemtype.partname', itemtype.get('partname'));
    
    if(item.length) {
      if((item.get('0.quantity') + 1) <= item.get('0.available')){
        item.set('0.quantity', parseInt(item.get('0.quantity') + 1));
        localStorage.setItem('cart', JSON.stringify(this.get('cart').toArray()));
        this._updateLength();
      } else {
        console.log('An unexpected error occured. You are not able to add more items then there are available into your cart.');
      }
    } else {
      // TODO
      console.log(itemtype.get('items').filter(function(item) {
        return (item.get('checkedoutto.content') === null)? item : null;
      }));
      // this.get('store').query('item', { 'itemtype.partname': itemtype.get('partname'), 'checkedoutto.content': null }).then((res) => {
      //   console.log(res)
      // });


      this.get('store').query('item', { 'itemtype.partname': itemtype.get('partname') } ).then(results => results.filter((item) => {
        return item.checkedoutto.content === null;
      })).then((res) => {
        this.get('cart').pushObject({'itemtype': itemtype, 'quantity': 1, 'available': res.length});
        localStorage.setItem('cart', JSON.stringify(this.get('cart').toArray()));
        this._updateLength();
      });
    }
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
      if(parseInt(quantity) <= items.get('0.available')){
        items.set('0.quantity', parseInt(quantity));
        localStorage.setItem('cart', JSON.stringify(this.get('cart').toArray()));
        this._updateLength();
      } else {
        console.log('An unexpected error has occured. You are not able to add more items then there are available into your cart.');
      }
    } else {
      this.get('store').query('item', { 'itemtype.partname': itemtype.get('partname') } ).then(results => results.filter((item) => {
        return item.checkedoutto.content === null;
      })).then((res) => {
        this.get('cart').pushObject({'itemtype' : itemtype, 'quantity' : quantity, 'available' : res.length});
        localStorage.setItem('cart', JSON.stringify(this.get('cart').toArray()));
        this._updateLength();
      });
    }
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