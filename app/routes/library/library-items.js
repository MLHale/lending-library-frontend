import Route from "@ember/routing/route";

export default Route.extend({
  // getData() {
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
    // return this.store.findAll("item").reverseObjects();
  // },
  model(params) {
    return this.store.findRecord("category", params.category_id);
  }
});
