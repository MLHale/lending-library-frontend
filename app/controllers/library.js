import Controller from '@ember/controller';

export default Controller.extend({

  actions:{
    add: function(itemtype, quantity){
      let cart = this.get('auth.profile.cart');
      console.log(cart);
      console.log("You've called the \"add\" function.");
      console.log('Itemtype: ' + itemtype);
      console.log('Quantity: ' + quantity);

      let newitem = this.get('store').createRecord('cartitemtypequantity', {
        cart: cart,
        itemtype: itemtype,
        quantity: quantity
      });

      newitem.save();
      }
  }
});
