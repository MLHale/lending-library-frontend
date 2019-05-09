import { A } from '@ember/array';
import Controller from '@ember/controller';
import $ from 'jquery';

export default Controller.extend({
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
