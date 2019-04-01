import DS from 'ember-data';

export default DS.Model.extend({
  id: DS.attr(),
  name: DS.attr(),
  description: DS.attr(),
  items: DS.hasMany('package-itemtype-rel'),
});
