import Controller from '@ember/controller';

export default Controller.extend({

  actions:{
    /**
      Adds a Cartitemtypequantity to the User's cart.
    */
    add: function(itemtype){
      var cart = this.get('auth.profile.cart');
      if (itemtype.get('quantity') < 1 || itemtype.get('quantity') == isNaN || itemtype.get('quantity') == null)
      {
        alert('Invalid quantity')
        return
      }
      alert('You\'ve added ' + itemtype.get('quantity') + ' ' + itemtype.get('name') + ' to your cart!')
      var found = cart.get('cartitemtypequantities').findBy('itemtype.name', itemtype.get('name'))
      if (found){
        found.set('quantity', found.get('quantity') + Number(itemtype.get('quantity')))
        found.save()
      } else{
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
