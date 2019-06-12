import DS from 'ember-data';

export default DS.Model.extend({
    user:DS.belongsTo('user'),
    org:DS.attr(),
    college:DS.attr(),
    dept:DS.attr(),
    otherdetails:DS.attr()
});
