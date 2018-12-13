import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
  deleteRecord: function(record) {
    var model = this.get('model');
    this.set('model', model.without(record));
  }
}
});
