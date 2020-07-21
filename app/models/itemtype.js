import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default Model.extend({
    partname:attr('string'),
    description:attr('string'),
    category:belongsTo('category'),
    items:hasMany('item'),
});

