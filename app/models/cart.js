import DS from 'ember-data';

export default DS.Model.extend({
  id: DS.attr(),
  user: DS.belongsTo('userprofile'),
  items: DS.hasMany('cart-itemtype-rel'),
});
