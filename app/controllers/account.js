import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default Controller.extend({
    auth: service('auth-manager'),
    errorMsg: '',
    init: function() {
        this._super(...arguments);
        this.set('errorMsg', ''); 
    },
    actions:{
		logout(){
			this.get('auth').logout();
        },
        
        save() {
            var controller = this;
            controller.get('model.user').validate().then(({ validations }) => {
                if(validations.get('errors').get('length') == 1 && validations.get('error.message') == "Password can't be blank"){
                    controller.get('model.user').save();

                    controller.get('model.profile').validate().then(({ validations }) => {
                        if(validations.get('isValid')){
                            controller.get('model.profile').save();
                            
                            $("#success-alert")
                            .fadeTo(5000, 500)
                            .slideDown(500, function() {
                                $("#success-alert").slideUp(500);
                            });

                        } else {
                            controller.set('errorMsg', validations.get('errors.1.message')); 
                            $("#danger-alert")
                            .fadeTo(5000, 500)
                            .slideDown(500, function() {
                                $("#danger-alert").slideUp(500);
                            });
                        }
                    });
                } else {
                    controller.set('errorMsg', validations.get('errors.1.message')); 
                    $("#danger-alert")
                    .fadeTo(5000, 500)
                    .slideDown(500, function() {
                        $("#danger-alert").slideUp(500);
                    });
                }
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
        },
        hideSuccess() {
            $("#success-alert").hide();
        },

        hideDanger() {
            $("#danger-alert").hide();
        }
	}
});
