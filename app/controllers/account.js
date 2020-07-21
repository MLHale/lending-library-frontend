import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
	auth: service('auth-manager'),
	
	showSuccess: false,
	showError: false,
	errorMsg: '',

    init: function() {
        this._super(...arguments);
        this.set('errorMsg', ''); 
    },
    actions:{
		logout(){
			this.auth.logout();
        },
        
        async save() {
			let controller = this;
			let user = await controller.get('auth.user');
			let profile = await controller.get('auth.profile');

            user.validate({ on: ['firstname', 'lastname', 'email'] }).then(({ validations }) => {
                if(validations.get('isValid')){
					user.save();

					profile.validate({ on: ['phonenumber', 'address'] }).then(({ validations }) => {
                        if(validations.get('isValid')){
							profile.save();
                            
							this.toggleProperty('showSuccess');
							setTimeout(() => { this.toggleProperty('showSuccess'); }, 5000);
                        } else {
							controller.set('errorMsg', validations.get('errors')[0].message); 
							
							this.toggleProperty('showError');
							setTimeout(() => { this.toggleProperty('showError'); }, 5000);
                        }
                    });
                } else {
					controller.set('errorMsg', validations.get('errors')[0].message); 
					
					this.toggleProperty('showError');
					setTimeout(() => { this.toggleProperty('showError'); }, 5000);
                }
            });
		},
	}
});
