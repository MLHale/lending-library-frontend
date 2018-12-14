import { computed, observer } from '@ember/object';
import { A } from '@ember/array';
import Controller from '@ember/controller';

export default Controller.extend({

  listitem: Ember.computed('', function(){
    return 'rpi2b.jpg';
  }),

  actions: {
    getitemcount(){
      //Loop through the objects and get count for each object and update objlist
      this.objlist.forEach(function(ite){
      Ember.$.ajax({
        //url can change, we just need to update the url
        url:'/api/items/count?partname='+ite.name,
        type:"GET",
        contentType:"application/json",
        dataType:"json",
        success: function(response){
          ite.qty=response.count;
        },
        error: function(responsse) {
          // Do error handling
        }

        });
    });
  }
},

//When we fecth items, just call this.actions.getitemcount(), this will update quantity values in objlist.

  objlist: A([{name:'item1', qty:'33' ,link:'rpi2b.jpg'}, {name:'item2', qty:'1' , link:'rpi2b.jpg'}]),
});
