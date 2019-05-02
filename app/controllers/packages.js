import Controller from '@ember/controller';

export default Controller.extend({
  actions:{
    /**
      Adds a Package (Set of Cartitemtypequantities) to the User's Cart
    */
    add: function(pkg){
      var contr = this;
      var cart = this.get('auth.profile.cart');

      if (pkg.get('quantity') < 1 || pkg.get('quantity') == isNaN || pkg.get('quantity') == null)
      {
        alert('Invalid quantity')
        return
      } else{
        alert('You\'ve added ' + pkg.get('quantity') + ' ' + pkg.get('name') + ' to your cart!')
      }

        pkg.get('packageitemtypequantities').forEach(function(packageitemtypequantity){

          var found = cart.get('cartitemtypequantities').findBy('itemtype.name',
            packageitemtypequantity.get('itemtype.name'))

          if (found){
            found.set('quantity', found.get('quantity') +
              Number(packageitemtypequantity.get('quantity')))
            found.save()
          } else{
            var newitem = contr.get('store').createRecord('cartitemtypequantity', {
              cart: cart,
              itemtype: packageitemtypequantity.get('itemtype'),
              quantity: packageitemtypequantity.get('quantity') * pkg.get('quantity')
            });

            newitem.save();
          }
        });
    }
  }
});
