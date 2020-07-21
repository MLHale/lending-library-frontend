import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import fade from 'ember-animated/transitions/fade';

export default Controller.extend({
	cart: service('shopping-cart'),
	store: service('store'),
    queryParams: ['search'], 
	search: '',
	showSuccess: false,
	showError: false,
	transition: fade,
	categoryID: 0,

	filtered: computed('search', 'model.itemtypes', function() { 
		let itemtypes = this.model.itemtypes; 
        let search = this.search.toLowerCase(); 
    
        if (isEmpty(search)) { 
            return itemtypes; 
        } 
    
        return itemtypes.filter(function(itemtype) { 
            return itemtype.get('partname').toLowerCase().match(search);
		}) 
	
	}), 

    actions: {
		callSuccess() {
			this.toggleProperty('showSuccess');
			setTimeout(() => { this.toggleProperty('showSuccess'); }, 5000);
		},

		callDanger() {
			this.toggleProperty('showError');
			setTimeout(() => { this.toggleProperty('showError'); }, 5000);
		},
    }
});