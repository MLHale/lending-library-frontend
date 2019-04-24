import Controller from '@ember/controller';

export default Controller.extend({

  actions:{
    add: function(itemtype){
      var cart = this.get('auth.profile.cart');
      console.log(cart);
      console.log("You've called the \"add\" function.");
      console.log('Itemtype: ' + itemtype);
      console.log('Quantity: ' + itemtype.get('quantity'));

      var found = cart.get('cartitemtypequantities').findBy('itemtype.name', itemtype.get('name'))

      if (found){
        console.log('Itemtype exists in cart, updating quantity...')

        found.set('quantity', found.get('quantity') + Number(itemtype.get('quantity')))
        found.save()
      } else{
        console.log('Itemtype does not exist in cart, creating new record...')
        let newitem = this.get('store').createRecord('cartitemtypequantity', {
          cart: cart,
          itemtype: itemtype,
          quantity: itemtype.get('quantity')
        });

        newitem.save();
      }
    }
  }
});
