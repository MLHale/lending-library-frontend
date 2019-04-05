import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('userprofile'),
  cartitemtypequantities: DS.hasMany('cartitemtypequantity'),
});
