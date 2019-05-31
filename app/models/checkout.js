import DS from 'ember-data';

export default DS.Model.extend({
    firstname:DS.attr('string'),
    lastname:DS.attr('string'),
    address:DS.attr('string'),
    phonenumber:DS.attr('string'),
    numberofstudents:DS.attr(),
    createdon:DS.attr(),
    fulfilledon:DS.attr(),
    returnedon:DS.attr(),
    missingparts:DS.attr(),
    items:DS.hasMany('item')
});
