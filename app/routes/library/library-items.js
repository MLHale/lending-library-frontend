import Route from '@ember/routing/route';
import $ from 'jquery';

export default Route.extend({
  model() {
    // return this.store.query('item', {
    //   filter: {
    //     category: params.categoryname
    //   }
    // });
    return this.store.findAll('item', {
      reload: true
    });
  },
  actions: {
    addToCart(item) {
      console.log("Added to cart: " + item.partname);





      $("#success-alert").fadeTo(5000, 500).slideUp(500, function () {
        $("#success-alert").slideUp(500);
      });

    },
    hideAlert() {
        $("#success-alert").hide();
    }
  }
});
