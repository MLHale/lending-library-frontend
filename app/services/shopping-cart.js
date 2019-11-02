import Service from '@ember/service';
import { A } from '@ember/array';
import ArrayProxy from '@ember/array/proxy';

export default Service.extend({

  // { itemtype: <Itemtype>, quantity: <int>, available: <int> }
  cart: null,



  init() {
    this._super(...arguments);

    this.set('cart', (localStorage.getItem('cart')) ? ArrayProxy.create({ content: A(JSON.parse(localStorage.getItem('cart')))}) : ArrayProxy.create({ content: A([])}));

    // if(localStorage.getItem('cart')){
    //   this.set('cart', ArrayProxy.create({ content: A(JSON.parse(localStorage.getItem('cart')))}));
    // } else {
    //   this.set('cart', ArrayProxy.create({ content: A([])}));
    // }

  },

  add(itemtype) {
    let item = this.get('cart').filterBy('itemtype.partname', itemtype.get('partname'));
    
    if(item.length) {
      console.log('Incremented ' + itemtype.get('partname') + ' quantity.');
      item.set('0.quantity', parseInt(item.get('0.quantity') + 1));
    } else {
      console.log('Added ' + itemtype.get('partname') + ' to cart.');
      this.get('cart').pushObject({'itemtype': itemtype, 'quantity': 1, available: itemtype.get('items.length')});
    }

    localStorage.setItem('cart', JSON.stringify(this.get('cart').toArray()));
  },

  remove(itemtype) {
    // let thiss = this;

    // this.get('itemtypes').forEach(function (element) {
    //   if(element.item === itemtype) {
    //     let obj = {'item': itemtype, 'quantity': 1};
    //     console.log(obj);
    //     thiss.get('itemtypes').removeObject(obj);
    //     console.log("Found " + itemtype.partname + ". Removed.");
    //   }
    // });

    // let storage = JSON.parse(localStorage.getItem('cart'));
    // let itemtypes = storage.filter(result => result.itemtype.partname !== itemtype.partname );
    // localStorage.setItem('cart', JSON.stringify(itemtypes));

    let removeItem = this.get('cart').filterBy('itemtype.partname', itemtype.partname);
    this.get('cart').removeObjects(removeItem);
    localStorage.setItem('cart', JSON.stringify(this.get('cart').toArray()));
    
  },

  setQuantity(itemtype, quantity) {
    let items = this.get('cart').filterBy('itemtype.partname', itemtype.partname);
    if(items.length) {
      items.set('0.quantity', parseInt(quantity));
    } else {
      this.get('cart').pushObject({'itemtype' : itemtype, 'quantity' : quantity});
    }

    localStorage.setItem('cart', JSON.stringify(this.get('cart').toArray()));
    console.log('Set ' + itemtype.partname + ' quantity to ' + quantity + '.');



    // let found = this.get('cart').some(element => {
    //   if(element.itemtype.partname === itemtype.partname) {
    //     console.log("Increased item quantity");
    //     element.itemtype.quantity = quantity;
    //     return true;
    //   }
    // });

    // if(!(found)) {
    //   console.log("An Error Occured. Item not found in cart.")
    // }
  },

  getQuantity(itemtype) {
    let item = this.get('cart').filterBy('itemtype.partname', itemtype.get('partname'));
    return (item.length) ? item.get('0.quantity') : 0;
  },

  empty() {
    localStorage.clear();
    this.get('cart').clear();
  },
});