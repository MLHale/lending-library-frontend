import DS from 'ember-data';

export default DS.Model.extend({
    id: DS.attr(),
    type: DS.belongsTo('itemtype'),
    barcode: DS.attr(),
    status: DS.attr(),
    owner: DS.belongsTo('userprofile'),
    checkedoutto: DS.belongsTo('userprofile'),
});
