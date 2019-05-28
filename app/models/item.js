import DS from 'ember-data';

export default DS.Model.extend({
    partname:DS.attr('string'),
    owner:DS.attr(),
    description:DS.attr('string'),
    checkedoutto:DS.attr(),
    category:DS.belongsTo('category'),
    price:DS.attr()
});
 