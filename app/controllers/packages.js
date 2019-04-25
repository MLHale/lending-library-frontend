import Controller from '@ember/controller';

export default Controller.extend({
  actions:{
    add: function(pkg){
      var contr = this;
      var cart = this.get('auth.profile.cart');
      console.log('Quantity: ' + pkg.get('quantity'))
      console.log("You've called the \"add\" function for packages.")
      console.log(pkg.name)

      if (pkg.get('quantity') < 1){
        console.log('Invalid quantity, no action taken.')
        alert('Invalid quantity')
        return
      }

      for (var i = 0; i < pkg.get('quantity'); i++){
        pkg.get('packageitemtypequantities').forEach(function(packageitemtypequantity){

          var found = cart.get('cartitemtypequantities').findBy('itemtype.name',
            packageitemtypequantity.get('itemtype.name'))

          if (found){
            // Update the quantity of existing cartitemtypequantity
            console.log('Itemtype exists in cart, updating quantity...')

            found.set('quantity', found.get('quantity') +
              Number(packageitemtypequantity.get('quantity')))
            found.save()
          } else{
            // Create a new record
            console.log('Itemtype does not exist in cart, creating new record...')
            var newitem = contr.get('store').createRecord('cartitemtypequantity', {
              cart: cart,
              itemtype: packageitemtypequantity.get('itemtype'),
              quantity: packageitemtypequantity.get('quantity')
            });

            newitem.save();
          }
        });
      }
    }
  }
});
