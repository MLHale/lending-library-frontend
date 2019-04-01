import DS from 'ember-data';

export default DS.Model.extend({
  id: DS.attr(),
  package: DS.belongsTo('package'),
  itemtype: DS.belongsTo('itemtype'),
  quantity: DS.attr(),
});
