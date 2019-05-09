import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        removeFromCart(item) {
            console.log("Removed from cart: " + item.partname);
        },
        modifyQuantity(item, numItems) {
            console.log("Modified quantity of " + item + " to: " + numItems);
        }
    }
});
