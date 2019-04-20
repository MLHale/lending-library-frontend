import DS from 'ember-data';

export default DS.Model.extend({
  org: DS.belongsTo('organization'),
  isadmin: DS.attr(),
  islender: DS.attr(),
  cart: DS.belongsTo('cart'),
});
