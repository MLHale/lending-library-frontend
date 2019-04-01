import DS from 'ember-data';

export default DS.Model.extend({
  id: DS.attr(),
  user: DS.blongsTo('userprofile'),
  status: DS.attr(),
  items: DS.hasMany('item'),
  createdon: DS.attr(),
  fulfilledon: DS.attr(),
  returnedon: DS.attr(),
  missingparts: DS.attr(),
});
