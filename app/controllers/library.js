import { computed } from '@ember/object';
import { A } from '@ember/array';
import Controller from '@ember/controller';
import $ from 'jquery';

// Import pagination 
import pagedArray from 'ember-cli-pagination/computed/paged-array';


export default Controller.extend({

  // Pagination Stuff
  queryParams: ["page", "perPage"],
  page: 1,
  perPage: 10,
  pagedContent: pagedArray('content', {
    page: computed.alias("parent.page"),
    perPage: computed.alias("parent.perPage"),
    totalPages: 2,
  }),
  // totalPages: computed.oneWay("pagedContent.totalPages"),
  // totalPages: 1,

  actions: {
    getitemcount(){
      //Loop through the objects and get count for each object and update objlist
      this.objlist.forEach(function(ite){
      $.ajax({
        //url can change, we just need to update the url
        url: '/api/items/count?partname='+ite.name,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function(response){
          ite.qty = response.count;
        },
        error: function() {
          // Do error handling
        }
      });
    });
  }
},

//When we fecth items, just call this.actions.getitemcount(), this will update quantity values in objlist.

  objlist: A([{name:'item1', qty:'33' ,link:'rpi2b.jpg'}, {name:'item2', qty:'1' , link:'rpi2b.jpg'}]),
});
