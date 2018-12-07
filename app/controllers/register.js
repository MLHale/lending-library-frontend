import Controller from '@ember/controller';
import config from '../config/environment';
import $ from 'jquery'

export default Controller.extend({
	
	passwordsValid: $.computed('model.password','confirmpassword',function(){
		return ((this.get('model.password')===this.get('confirmpassword')) && (this.get('model.password')!=null));
	}),
	emailsValid: $.computed('model.email','confirmemail',function(){
		return ((this.get('model.email')===this.get('confirmemail'))&&(this.get('model.email')!=null));
	}),
	invalidForm: $.computed('passwordsValid','emailsValid','model.username',function(){
		return !(this.get('emailsValid') && this.get('passwordsValid') && (this.get('model.username')!=null));
	}),
	actions: {
		register: function(){
			this.set('validationErrorMsg', '');
			var user = this.get('model');
			var controller = this;

			var requestdata = {
				'username': user.get("username"),
				'password': user.get('password'),
				'email': user.get('email'),
			};
			$.post(config.serverName+'/api/', requestdata, function(response){
				var errMsg = '';
				if(response.data.status ==="error"){
					if(response.data.username){
						errMsg = response.data.username;
					}
					else if(response.data.email){
						errMsg = response.data.email;
					}
					else {
						errMsg = "An unknown error occured. Please try again";
					}
					controller.set('validationErrorMsg', errMsg);
					controller.get('notifications').warning(`${controller.get('validationErrorMsg')}`, {
						clearDuration: 3000,
						autoClear: true
					});
				}
				else{
					//success
					controller.set('success', true);
					controller.get('auth').set('username',user.get('username'))
					controller.get('auth').set('password',user.get('password'))
					controller.get('notifications').success(`Successful registration.`, {
						clearDuration: 3000,
						autoClear: true
					});
					controller.transitionToRoute('login');
				}


			});
		}
	}
});
