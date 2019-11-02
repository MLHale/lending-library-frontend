import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default Controller.extend({
    checkedOut: false,
    error: false,
    cart: service('shopping-cart'),
    auth: service('auth-manager'),

    init: function() {
        this._super(...arguments)

        if(!(this.cart.cart.length)) {
            this.transitionToRoute('cart');
        }
    },

    actions: {
        checkout() {

        },
        checkoutBackup() {
            let controller = this;
            let first = $('#first').val();
            let last = $('#last').val();
            let address = $('#address').val();
            let phone = $('#phone').val();
            let students = $('#students').val();

            if(first == "" || last == "" || address == "" || phone == "" || students == "") {
                console.log("You must fill in all of the form fields.");
                this.set('errorMsg', 'You must fill in all of the form fields.');

                $("#danger-alert")
                .fadeTo(5000, 500)
                .slideDown(500, function() {
                    $("#danger-alert").slideUp(500);
                });
            } else {

                console.log("Logged In: " + (controller.get('auth').get('isLoggedIn')));

                let newCheckout = controller.store.createRecord('checkout', {
                    firstname: (controller.get('auth').get('isLoggedIn') ? controller.get('auth').get('user').get('firstname') : first),
                    lastname: (controller.get('auth').get('isLoggedIn') ? controller.get('auth').get('user').get('lastname') : last),
                    address: (controller.get('auth').get('isLoggedIn') ? controller.get('auth').get('user').get('profile').get('address') : address),
                    phonenumber: (controller.get('auth').get('isLoggedIn') ? controller.get('auth').get('user').get('profile').get('phonenumber') : phone),
                    numberofstudents: students,
                    profile: (controller.get('auth').get('isLoggedIn') ? controller.get('auth').get('profile') : null),      
                    createdon: new Date(),
                });

                newCheckout.save().then(function(){
                    console.log("asdf");
                    controller.get('cart').get('cart').forEach(cartitem => {
                        // for(var i = 0; i < cartitem.get('quantity'); i++){
                            controller.store.query('item', {'checkedoutby': null, 'itemtype.partname': cartitem.itemtype.partname}).then(function(item){
                                console.log("---------------------");
                                console.log("Item:");
                                console.log(item);
                                console.log("---------------------");
                                console.log("Item ID:");
                                console.log(item.id);
                                console.log("---------------------");
                                let selectedItem = item;
                                console.log("Pre-assignment:");
                                console.log(selectedItem.get('checkedoutto'));
                                console.log("---------------------");
                                selectedItem.set('checkedoutto', newCheckout);
                                console.log("Post-assignment:");
                                console.log(selectedItem.get('checkedoutto'));
                                console.log("---------------------");
                                console.log("Checkout ID:");
                                console.log(newCheckout.get('id'));
                                console.log("---------------------");
                                selectedItem.save();
                            });
                        // }
                    });
                });
                
                

                

                // controller.get('auth.user')

                // this.cart.empty();

                $("#success-alert")
                .fadeTo(5000, 500)
                .slideDown(500, function() {
                    $("#success-alert").slideUp(500);
                });

            }
        },
        
        hideSuccess() {
            $("#success-alert").hide();
        },

        hideDanger() {
            $("#danger-alert").hide();
        }
    }
});
