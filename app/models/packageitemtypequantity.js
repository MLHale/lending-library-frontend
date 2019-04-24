import DS from 'ember-data';

export default DS.Model.extend({
  package: DS.belongsTo('package'),
  itemtype: DS.belongsTo('itemtype'),
  quantity: DS.attr('number')
});
