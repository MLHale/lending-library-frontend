import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default Controller.extend({
  auth: service('auth-manager'),
  showAlert: false,
  isRegistered: false,
  didValidate: false,

  actions: {
    register() {
        var controller = this;
        controller.get('model').validate().then(({ validations }) => {
            controller.set('didValidate', true);
            if (validations.get('isValid')) {

                console.log("Registering " + controller.get('first') + " " + controller.get('last') + " as: " + controller.get('username'));

                var requestdata = {
					'username': controller.get('username'),
					'password': controller.get('password'),
					'email': controller.get('email'),
					'firstname': controller.get('first'),
					'lastname': controller.get('last'),
					'address': controller.get('address'),
					'phone': controller.get('phone'),
                };
                
                $.post('../api/register/', requestdata, function(response){
					var errMsg = '';
					if(response.data.status ==="error"){
                        
						if(response.data.username){
							errMsg = response.data.username;
						} else if(response.data.email){
							errMsg = response.data.email;
						} else {
							errMsg = "An unknown error occured. Please try again";
                        }
                        
                        controller.set('validationErrorMsg', errMsg);
                        controller.setProperties({
                            showAlert: true,
                            isRegistered: false,
                        });

					} else {

						controller.get('auth').set('username',controller.get('username'))
						controller.get('auth').set('password',controller.get('password'))

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
    }
  }
});