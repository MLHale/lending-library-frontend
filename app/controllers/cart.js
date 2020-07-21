import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import fade from 'ember-animated/transitions/fade';

export default Controller.extend({
	cart: service('shopping-cart'),
	
	confirm: false,
	transition: fade,
	
    init: function() {
        this._super(...arguments)
        this.set('confirm', false);
    },
    actions: {
        remove(itemtype) {
            this.cart.remove(itemtype);
        },
        confirm() {
            this.set('confirm', true);
        },
        clear() {
            this.cart.empty();
            this.set('confirm', false);
        },
        close() {
            this.set('confirm', false);
		},
		modifyQuantity(cartitem) {
			let newQuantity = document.getElementById(cartitem.id).value;
			this.cart.setQuantity(cartitem.itemtype, newQuantity);
		}
    }
});
