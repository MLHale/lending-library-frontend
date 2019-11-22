import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
    partname:DS.attr('string'),
    description:DS.attr('string'),
    category:DS.belongsTo('category'),
    items:DS.hasMany('item'),
    availableitems: computed('items.@each,items', function() {
        return this.get('items').filter(function(item) {
            console.log(item)
            return item.get('checkedoutto') === null;
        });
    })

    // console.log(itemtype.get('items').filter(function(item) {
    //     return (item.get('checkedoutto.content') === null)? item : null;
    //   }));
});

