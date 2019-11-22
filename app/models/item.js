import DS from 'ember-data';

export default DS.Model.extend({
    owner:DS.belongsTo('user'),
    checkedoutto:DS.belongsTo('checkout', {defaultValue: null}),
    itemtype:DS.belongsTo('itemtype'),
});
 
 