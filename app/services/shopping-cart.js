import Service from '@ember/service';
import { computed }  from '@ember/object';
import { storageFor } from 'ember-local-storage';

export default Service.extend({
  items: storageFor('cart'),
  // itemPrices: computed.mapBy('item', 'price'),
  // total: computed.sum('itemPrices'),
  total: computed('items.@each', function(){

    var sum = 0.00;

    // TODO: Maybe there is a better way to do this
    for(var i = 0; i < this.get('items').length; i++) {
      sum += parseFloat(this.get('items')._objects[i].price);
    }
    return sum;

  }),

  init() {
    this._super(...arguments);
  },

  add(item) {
    this.get('items').addObject(item);
  },

  remove(item) {
    this.get('items').removeObject(item);
  },

  empty() {
    this.get('items').clear();
  }

});