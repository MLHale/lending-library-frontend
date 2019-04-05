import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  description: DS.attr(),
  packageitemtypequantities: DS.hasMany('packageitemtypequantity'),
});
