import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    cart: service('shopping-cart'),
    actions: {
        remove(item) {
            this.cart.remove(item);
            console.log("Removed from cart: " + item.partname);
        },
        clear() {
            this.cart.empty();
            console.log("Cleared cart");
        },
        modifyQuantity(item, value) {
            console.log("Changed " + item.partname + " to " + value);
        },
        checkout() {
            console.log("Checking out!");
        }
    }
});
