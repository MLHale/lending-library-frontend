import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  actions:{
    /**
      Places an Order per the Cartitemtypequantities within the User's Cart
    */
    order: function(){
      var cart = this.get('auth.profile.cart')
      // Note: Possibly change model hook to only query for available items
      var inventory = this.get('items').filterBy('status', 'AVA')
      var comp = this
      var fulfillable = true
      if (cart.get('cartitemtypequantities._length') == 0)
      {
        console.log('Cart is empty, no order will be placed.')
        fulfillable = false
      }
      cart.get('cartitemtypequantities')
        .forEach(function(cartitemtypequantity){
        var results = inventory.filterBy('type.name',
          cartitemtypequantity.get('itemtype.name'))
        console.log('Requested Quantity: '
          + cartitemtypequantity.get('quantity'))
        console.log('Available Quantity: '
          + results.get('length'))
        if (cartitemtypequantity.get('quantity') <= results.get('length')){
          console.log('Sufficient '
            + cartitemtypequantity.get('itemtype.name') + ' in stock')
        } else{
          fulfillable = false
          console.log('Insufficient '
            + cartitemtypequantity.get('itemtype.name') + ' in stock')
        }
      })
      console.log('Order is fulfillable: ' + fulfillable)
      if (fulfillable){
        let neworder = comp.get('store').createRecord('order', {
          user: comp.get('auth.profile'),
          status: 'ORD',
        });
        cart.get("cartitemtypequantities")
          .forEach(function(cartitemtypequantity){
          var results = inventory.filterBy('type.name',
            cartitemtypequantity.get('itemtype.name'))
          for (var i = 0; i < cartitemtypequantity.get('quantity'); i++){
            results[i].set('status', 'CO')
            results[i].set('checkedoutto', comp.get('auth.profile'))
            results[i].save()
            neworder.get('items').pushObject(results[i])
          }
        })
        var dateObj = new Date()
        neworder.set('createdon', dateObj.toISOString())
        neworder.save()
        console.log('Order placed, emptying cart.')
        comp.send('empty')
      }
    },
    /**
      Removes a Cartitemtypequantity from the User's Cart
    */
    remove: function(itemtype){
      itemtype.deleteRecord();
      itemtype.save();
    },
    /**
      Removes all Cartitemtypequantities from the User's Cart
    */
    empty: function(){
      var cart = this.get('auth.profile.cart');
      cart.get("cartitemtypequantities").forEach(function(cartitemtypequantity){
      cartitemtypequantity.deleteRecord();
      cartitemtypequantity.save()
      });
    }
  }
});
