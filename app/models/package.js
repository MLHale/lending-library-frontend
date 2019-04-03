import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  description: DS.attr(),
  items: DS.hasMany('packageitemtyperel'),
});
