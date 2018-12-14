import DS from 'ember-data';

export default DS.Model.extend({
tittle:DS.attr(),
descripton:DS.attr(),
awardlink:DS.attr(),
sponsororg:DS.attr(),
recurring:DS.attr(),
recurinterval:DS.attr(),
opendate:DS.attr(),
additionalinfo:DS.attr(),
previousapplications:DS.attr(),

});
