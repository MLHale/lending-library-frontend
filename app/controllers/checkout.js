import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default Controller.extend({
    errorMsg: false,
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
            let controller = this;
            let newCheckout = controller.get('model.newCheckout');

            newCheckout.validate().then(({ validations }) => {
                controller.set('didValidate', true);
                if (validations.get('isValid')) {
                    
                    if(controller.get('auth').get('isLoggedIn')) {
                        newCheckout.set('profile', controller.get('auth').get('profile'));
                        console.log('Attached profile to checkout.');
                    }

                    newCheckout.set('createdon', new Date());

                    newCheckout.save().then(function(){
                        controller.get('cart').get('cart').forEach(cartitem => {
                            for(var i = 0; i < cartitem.quantity; i++){
                                controller.get('store').query('item', { 'itemtype.partname': cartitem.itemtype.partname } ).then(results => results.filter((item) => {
                                    return item.checkedoutto.content === null;
                                })).then((res) => {
                                    if(res.length > 0) {
                                        let selectedItem = res.get('firstObject');
                                        console.log(selectedItem.get('itemtype.partname') + ' (id ' + selectedItem.get('id') + ') owned by ' + selectedItem.get('checkedoutto.firstname') + ' now assigned to checkout id ' + newCheckout.get('id'));
                                        selectedItem.set('checkedoutto', newCheckout);
                                        selectedItem.save();
                                    } else {
                                        console.log("You have too many items in your cart that we do not have enough inventory to fill. Please check your order again.")
                                    }
                                });

                                /** 

                                controller.store.query('item', { 'checkedoutto': null, 'itemtype.partname': cartitem.itemtype.partname } ).then(function(item){
                                    console.log("Result from query: ");
                                    console.log(item);
                                    let selectedItem = item.get('firstObject');
                                    console.log(selectedItem.get('itemtype.partname') + ' (id ' + selectedItem.get('id') + ') owned by ' + selectedItem.get('checkedoutto.firstname') + ' now assigned to checkout id ' + newCheckout.get('id'));
                                    
                                    // console.log()
                                    // console.log("---------------------");
                                    // console.log("Item:");
                                    // console.log(item.get('firstObject'));
                                    // console.log("---------------------");
                                    // console.log("Item Owner:");
                                    // console.log(item.get('firstObject.owner'));
                                    // console.log("---------------------");
                                    // let selectedItem = item.get('firstObject');
                                    // console.log("Pre-assignment:");
                                    // console.log(selectedItem.get('checkedoutto'));
                                    // console.log("---------------------");
                                    selectedItem.set('checkedoutto', newCheckout);
                                    // console.log("Post-assignment:");
                                    // console.log(selectedItem.get('checkedoutto'));
                                    // console.log("---------------------");
                                    // console.log("Checkout ID:");
                                    // console.log(newCheckout.get('id'));
                                    // console.log("---------------------");
                                    selectedItem.save();
                                });

                                */
                            }
                        });
                    });

                    this.cart.empty();

                    $("#success-alert")
                    .fadeTo(5000, 500)
                    .slideDown(500, function() {
                        $("#success-alert").slideUp(500);
                    });
                }
            });
        },
        
        hideSuccess() {
            $("#success-alert").hide();
        },

        hideDanger() {
            $("#danger-alert").hide();
        }
    }
});
