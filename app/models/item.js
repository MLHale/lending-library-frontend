import DS from 'ember-data';

export default DS.Model.extend({
    owner:DS.attr(),
    checkedoutto:DS.attr(),
    itemtype:DS.belongsTo('itemtype'),
});
 
 