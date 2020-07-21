import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
	auth: service('auth-manager'),
	errorMsg: false,
	showSuccess: false,
	showError: false,
	actions: {
		setSelection(selected) {
			this.set('model.profile.org', selected);
		},
		register() {
			var controller = this;
			let newUser = controller.model;
			// let newProfile = controller.get('model.profile');

			newUser.validate().then(({ validations }) => {
				controller.set('didValidate', true);
				if (validations.get('isValid')) {

					let xhr = new XMLHttpRequest();
					let fd = new FormData();

					fd.append('username', controller.get('model.username'));
					fd.append('password', controller.get('model.password'));
					fd.append('email', controller.get('model.email'));
					fd.append('firstname', controller.get('model.firstname'));
					fd.append('lastname', controller.get('model.lastname'));
					fd.append('address', controller.get('model.profile.address'));
					fd.append('phone', controller.get('model.profile.phonenumber'));
					fd.append('org', controller.get('model.profile.org'));

					xhr.open("POST", '../api/register/', true);
					xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
					xhr.onreadystatechange = function () {
						if (this.readyState == 4 && this.status == 200) {

							let resp = JSON.parse(xhr.responseText)
							if(resp.data.status === 'error') {
								controller.set('errorMsg', resp.data.msg);
								controller.toggleProperty('showError');
								setTimeout(() => { controller.toggleProperty('showError'); }, 5000);
							} else {
								controller.transitionToRoute('library');
							}

						} else if(this.readyState == 4 && this.status == 500) {
							controller.set('errorMsg', 'There was an error registering your account. Please check the data you entered and try again.');
							controller.toggleProperty('showError');
							setTimeout(() => { controller.toggleProperty('showError'); }, 5000);
						}
					};

					const queryString = new URLSearchParams(fd).toString();
					xhr.send(queryString);
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