import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  address1: DS.attr(),
  address2: DS.attr(),
  city: DS.attr(),
  state: DS.attr(),
  zipcode: DS.attr(),
});
