import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default Controller.extend({
    cart: service('shopping-cart'),
    actions: {
        add(item) {
            this.cart.add(item);
            $("#success-alert")
            .fadeTo(5000, 500)
            .slideDown(500, function() {
                $("#success-alert").slideUp(500);
            });
        },
    }
});