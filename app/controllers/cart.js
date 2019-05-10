import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    cart: service('shopping-cart'),
    actions: {
        remove(item) {
            this.cart.remove(item);
        },
        clear() {
            this.cart.empty();
        },
    }
    
    // actions: {
    //     removeFromCart(item) {
    //         console.log("Removed from cart: " + item.partname);
    //     },
    //     modifyQuantity(item, numItems) {
    //         console.log("Modified quantity of " + item + " to: " + numItems);
    //     }
    // }
});
