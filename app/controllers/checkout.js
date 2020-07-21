import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Controller.extend({
    cart: service('shopping-cart'),
	auth: service('auth-manager'),

	didValidate: false,
	errorPart: '',
	showError: false,

	// This is for the route to dump the cart if they leave after checkout
	hasCheckedout: false,

    init: function() {
        this._super(...arguments)

        if(!(this.cart.cart.length)) {
            this.transitionToRoute('cart');
		}
	},

	async asyncForEach(array, callback) {
		for(let index = 0; index < array.length; index++) {
			await callback(array.objectAt(index), index, array);
		}
	},

    actions: {
        async checkout() {
            let controller = this;
			let newCheckout = controller.get('model.newCheckout');

			newCheckout.validate({ on: ['numberofstudents'] }).then( async ({ validations }) => {
                controller.set('didValidate', true);
                if (validations.get('isValid')) {
                    
                    if(controller.auth.get('isLoggedIn')) {
						let profile = controller.auth.get('profile');
						let user = controller.auth.get('user');
						newCheckout.set('profile', profile);
						newCheckout.set('firstname', user.get('firstname'));
						newCheckout.set('lastname', user.get('lastname'));
						newCheckout.set('email', user.get('email'));
						newCheckout.set('phonenumber', profile.get('phonenumber'));
						newCheckout.set('address', profile.get('address'));
                    }

                    newCheckout.set('createdon', new Date());

					let itemsToCheckout = A([]);
					let error = false;

					// Loop through each type of item in the cart
					await this.asyncForEach(controller.get('cart.cart'), async (cartitem) => {

						// Short circuit if there is an error
						if (!error) {
							let availableItems = A([]);

							// Find all the available items of that itemtype
							await controller.store.query('item', { 'itemtype': cartitem.id }).then(async (items) => {
								await this.asyncForEach(items, async (item) => {
									let checkedouttoid = await item.get('checkedoutto.id');
									if (checkedouttoid == null) {
										availableItems.pushObject(item);
									}
								});

								// Check if we can fulfill that many of the itemtype
								if (availableItems.length < cartitem.quantity || availableItems.length == 0) {
									error = true;
									controller.set('errorPart', cartitem.itemtype.partname);
									itemsToCheckout.clear();
								} else {
									for (var i = 0; i < cartitem.quantity; i++) {
										let item = availableItems[i];
										itemsToCheckout.pushObject(item);
									}
								}
							})
						}
					});

					// Check if there was an error
					if(!(error)) {

						// If not, actually save the checkout
						newCheckout.save().then( async (checkout) => {
							itemsToCheckout.forEach( (item) => {
								item.set('checkedoutto', checkout);
								item.save();
							});

							let overlay = document.getElementById('overlay');
							let checkmark = document.getElementById('checkmark');
							let circle = document.getElementById('circle');
							let check = document.getElementById('check');

							overlay.style.zIndex = "2";
							overlay.style.opacity = "1";

							checkmark.classList.add("checkmark");
							circle.classList.add("checkmark__circle");
							check.classList.add("checkmark__check");

							controller.cart.empty();
						});
					} else {

						// Show the error message
						controller.toggleProperty('showError');
						setTimeout(() => {
							controller.toggleProperty('showError');
							controller.set('errorPart', '');
						}, 5000);
					}
                }
            });
		},
		
		hideSuccess() {
			let controller = this;
			let overlay = document.getElementById('overlay');
			let checkmark = document.getElementById('checkmark');
			let circle = document.getElementById('circle');
			let check = document.getElementById('check');

			overlay.style.opacity = "0";

			setTimeout(() => { 
				overlay.style.zIndex = "-1"; 
				checkmark.classList.remove("checkmark");
				circle.classList.remove("checkmark__circle");
				check.classList.remove("checkmark__check");
				controller.transitionToRoute('library');
			}, 500);
	
		}
    }
});
