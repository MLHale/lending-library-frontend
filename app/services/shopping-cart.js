import Service from '@ember/service';
// import { computed }  from '@ember/object';
import { storageFor } from 'ember-local-storage';

export default Service.extend({
  items: storageFor('cart'),
  // itemPrices: computed.mapBy('item', 'price'),
  // total: computed.sum('itemPrices'),

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