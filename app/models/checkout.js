import DS from 'ember-data';

export default DS.Model.extend({

firstName:DS.attr('string'),
lastName:DS.attr('string'),
address:DS.attr('string'),
phoneNumber:DS.attr('string'),
numberOfStudents:DS.attr(),
createdOn:DS.attr(),
fulfilledon:DS.attr(),
returnedon:DS.attr(),
missingparts:DS.attr()


});
