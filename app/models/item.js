import Model, { belongsTo } from '@ember-data/model';

export default Model.extend({
    owner:belongsTo('user'),
    checkedoutto:belongsTo('checkout', { defaultValue: null }),
	itemtype:belongsTo('itemtype'),
	missingpart: belongsTo('checkout', { 
		defaultValue: null,
		inverse: 'missingparts'
	}),
});
 
 