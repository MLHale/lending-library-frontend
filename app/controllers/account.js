import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default Controller.extend({
    auth: service('auth-manager'),
    showAlert: false,
    isRegistered: false,
    didValidate: false,
    
    init: function() {
        this._super(...arguments)

        if(!(this.get('auth').get('isLoggedIn'))){
            this.transitionToRoute('login');
        }
    },
    actions:{
		logout(){
			this.get('auth').logout();
        },
        
        save() {
            var controller = this;
            controller.get('model').validate().then(({ validations }) => {
                controller.set('didValidate', true);
                if (validations.get('isValid')) {
    
                    console.log("Saving information for " + controller.get('first') + " " + controller.get('last'));
    
                    controller.get('model').save();

                    controller.setProperties({
                        showAlert: false,
                        isRegistered: true,
                    });

                    $("#success-alert")
                    .fadeTo(5000, 500)
                    .slideDown(500, function() {
                        $("#success-alert").slideUp(500);
                    });
                } else {
                    controller.set('showAlert', true);
                }
            });
        }
	}
});
