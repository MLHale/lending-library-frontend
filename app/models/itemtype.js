import DS from 'ember-data';

export default DS.Model.extend({
    partname:DS.attr('string'),
    description:DS.attr('string'),
    category:DS.belongsTo('category'),
    items:DS.hasMany('item')
});

