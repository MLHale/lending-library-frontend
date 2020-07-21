import Model, { attr, hasMany } from '@ember-data/model';

export default Model.extend({
    categoryname:attr(),
    description:attr(),
    image:attr(),
    itemtypes:hasMany('itemtype')
});
 