import DS from 'ember-data';

export default DS.Model.extend({
  cart: DS.belongsTo('cart'),
  itemtype: DS.belongsTo('itemtype'),
  quantity: DS.attr('number'),
});
