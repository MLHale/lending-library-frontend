import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    checkedOut: false,
    cart: service('shopping-cart'),
    actions: {
        checkout() {
            let newCheckout = this.store.createRecord('checkout', {
                firstname: this.get("first"),
                lastname: this.get("last"),
                address: this.get("address"),
                phonenumber: this.get("phone"),
                numberofstudents: this.get("students"),
                createdon: new Date().toISOString(),
            });
            newCheckout.save();
            this.cart.empty();
            this.checkedOut = true;
        }
    }
});
