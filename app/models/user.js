import DS from 'ember-data';

export default DS.Model.extend({
    username: DS.attr(),
    firstname: DS.attr(),
    lastname: DS.attr(),
    email: DS.attr(),
});
