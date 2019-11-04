import Controller from '@ember/controller';

export default Controller.extend({
  itemsAvailable: 0,
  init: function() {
    this._super(...arguments)

    let controller = this;
    controller.store.findAll('item').then((ret) => {
      controller.set('itemsAvailable', ret.get('_length'));
    });
  },
  

});
