import DS from 'ember-data';

export default DS.Model.extend({
  id: DS.attr(),
  cart: DS.belongsTo('cart'),
  itemtype: DS.belongsTo('itemtype'),
  quantity: DS.attr(),
});
