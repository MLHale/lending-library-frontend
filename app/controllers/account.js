import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default Controller.extend({
    auth: service('auth-manager'),
    showAlert: false,
    isRegistered: false,
    didValidate: false,
    
    init: function() {
        this._super(...arguments);
    },
    actions:{
		logout(){
			this.get('auth').logout();
        },
        
        save() {
            var controller = this;
            controller.get('model.user').validate().then(({ validations }) => {
                console.log(validations);
                if(validations.get('errors').get('length') == 1 && validations.get('error').get('message') == "Password can't be blank"){
                    console.log('Saved the user model');
                    controller.get('model.user').save();
                }
            });

            controller.get('model.profile').validate().then(({ validations }) => {
                console.log(validations);
                if(validations.get('isValid')){
                    console.log('Saved the user profile');
                    controller.get('model.profile').save();
                }
            });



            // controller.get('model.profile').validate().then(({ validations }) => {
            //     console.log(validations);
            //     if (validations.get('isValid')) {
            //         controller.get('model.user').validate().then(({ validations_user }) => {
            //             controller.set('didValidate', true);
            //             if (validations_user.get('errors')) {
    
                            console.log("Saving information for " + controller.get('first') + " " + controller.get('last'));
    
                            controller.get('model.user').save();
                            controller.get('model.profile').save();

                            controller.setProperties({
                                showAlert: false,
                                isRegistered: true,
                            });

                            $("#success-alert")
                            .fadeTo(5000, 500)
                            .slideDown(500, function() {
                                $("#success-alert").slideUp(500);
                            });
            //             } else {
            //                 console.log(validations_user);
            //                 controller.set('showAlert', true);
            //             }
            //         });
            //     } else {
            //         console.log(validations_profile);
            //         controller.set('showAlert', true);
            //     }
            // });
        }
	}
});
