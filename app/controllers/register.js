import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default Controller.extend({
	auth: service('auth-manager'),
	errorMsg: false,
	actions: {
		register() {
			var controller = this;
			let newUser = controller.get('model');
			// let newProfile = controller.get('model.profile');

			console.log(newUser);

			newUser.validate().then(({ validations }) => {
				controller.set('didValidate', true);
				if (validations.get('isValid')) {

					console.log("Registering " + controller.get('model.firstname') + " " + controller.get('model.lastname') + " as: " + controller.get('model.username'));

					var requestdata = {
						'username': controller.get('model.username'),
						'password': controller.get('model.password'),
						'email': controller.get('model.email'),
						'firstname': controller.get('model.firstname'),
						'lastname': controller.get('model.lastname'),
						'address': controller.get('model.profile.address'),
						'phone': controller.get('model.profile.phonenumber'),
					};

					$.post('../api/register/', requestdata, function (response) {
						var errMsg = '';
						if (response.data.status === "error") {

							if (response.data.username) {
								errMsg = response.data.username;
							} else if (response.data.email) {
								errMsg = response.data.email;
							} else {
								errMsg = "An unknown error occurred. Please try again";
							}

							controller.set('validationErrorMsg', errMsg);
							console.log(errMsg);
							controller.setProperties({
								showAlert: true,
								isRegistered: false,
							});

						} else {

							controller.get('auth').set('username', controller.get('username'))
							controller.get('auth').set('password', controller.get('password'))

							controller.setProperties({
								showAlert: false,
								isRegistered: true,
							});

							controller.transitionToRoute('login');
						}
					});
				} else {
					controller.set('showAlert', true);
				}
			});
		},

		toggleProperty(p) {
			this.toggleProperty(p);
		},

		hide() {
			this.set('showAlert', false);
		}
	}
});