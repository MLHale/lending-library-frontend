import Route from "@ember/routing/route";
import { later } from "@ember/runloop";
import $ from "jquery";

export default Route.extend({
  getData() {
    // console.log("Category id: ");
    // console.log(params.category_id);


    // var category = this.store.query('category', {
    //   filter: {
    //     id: params.category_id
    //   }
    // }).reverseObjects();

    // console.log("Category API Result: ");
    // console.log(category);
    // console.log("Category Name API Result: ");
    // console.log(category.categoryname);


    // let category = this.get('store').findRecord('category', params.category_id);

    // console.log(category.get('categoryName'));

    // return this.store.query('item', {
    //   filter: {
    //     category: category.get('categoryName')
    //   }
    // }).reverseObjects();
    return this.store.findAll("item").reverseObjects();
  },
  model() {
    return this.getData();
  },
  setupController(controller, model) {
    this._super(controller, model);
    this.set("items", this.getData());
    var route = this;
    setInterval(
      later(
        route,
        function() {
          // code here will execute within a RunLoop about every minute
          if (controller.get("auth.isLoggedIn")) {
            route.getData().then(function(data) {
              if (data[0].id != controller.get("content")[0].id) {
                controller.get("content").insertAt(0, data[0]);
              }
            });
          }
        },
        5
      ),
      3000
    );
  },
  actions: {
    addToCart(item) {
      console.log("Added to cart: " + item.partname);

      $("#success-alert")
        .fadeTo(5000, 500)
        .slideUp(500, function() {
          $("#success-alert").slideUp(500);
        });
    },
    hideAlert() {
      $("#success-alert").hide();
    }
  }
});
