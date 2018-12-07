import { computed, observer } from '@ember/object';
import { A } from '@ember/array';
import Controller from '@ember/controller';

export default Controller.extend({

  listitem: Ember.computed('', function(){
    return 'rpi2b.jpg';
  }),

  objlist: A([{name:'item1', qty:'1' ,link:'rpi2b.jpg'}, {name:'item2', qty:'1' , link:'rpi2b.jpg'}]),
});
