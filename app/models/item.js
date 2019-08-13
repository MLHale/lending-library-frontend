import DS from 'ember-data';

export default DS.Model.extend({
    owner:DS.belongsTo('user'),
    checkedoutto:DS.belongsTo('checkout'),
    itemtype:DS.belongsTo('itemtype'),
});
 
 