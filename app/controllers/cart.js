import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default Controller.extend({
    cart: service('shopping-cart'),
    confirm: false,
    init: function() {
        this._super(...arguments)
        this.set('confirm', false);
    },
    actions: {
        remove(itemtype) {
            this.cart.remove(itemtype);
            console.log("Removed from cart: " + itemtype.partname);
        },
        confirm() {
            this.set('confirm', true);
        },
        clear() {
            // $("#success-alert")
            // .fadeTo(5000, 500)
            // .slideDown(500, function() {
            //     $("#success-alert").slideUp(500);
            // });
            this.cart.empty();
            this.set('confirm', false);
            console.log("Cleared cart");
        },
        modifyQuantity(itemtype) {
            this.cart.setQuantity(itemtype, $(("#" + itemtype.partname.replace(/\s+/g, ''))).val());
        },

    }
});
