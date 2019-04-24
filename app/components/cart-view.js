import Component from '@ember/component';

export default Component.extend({
  actions:{
    order: function(){
      console.log("You've called the \"order\" function.");
    },
    remove: function(itemtype){
      console.log("You've called the \"remove\" function to remove (" +
        itemtype.quantity + ") " + itemtype.get('itemtype.name'));
      itemtype.deleteRecord();
      itemtype.save();
    },
    empty: function(){
      console.log("You've called the \"empty\" function.");
      let cart = this.get('auth.profile.cart');
      cart.get("cartitemtypequantities").forEach(function(cartitemtypequantity){
      cartitemtypequantity.deleteRecord();
      cartitemtypequantity.save()
      });
    }
  }
});
