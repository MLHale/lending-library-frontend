import Controller from '@ember/controller';

export default Controller.extend({
  actions:{
    add: function(pkg, qty){
      var contr = this;
      var cart = this.get('auth.profile.cart');
      console.log('Quantity: ' + qty)
      console.log("You've called the \"add\" function for packages.")
      console.log(pkg.name)

      for (var i = 0; i < qty; i++){
        pkg.get('packageitemtypequantities').forEach(function(packageitemtypequantity){
          let newitem = contr.get('store').createRecord('cartitemtypequantity', {
            cart: cart,
            itemtype: packageitemtypequantity.get('itemtype'),
            quantity: packageitemtypequantity.get('quantity')
          });

          newitem.save();
        });
      }
    }
  }
});
