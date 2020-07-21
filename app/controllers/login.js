import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
	auth: service('auth-manager'),
	passwordHidden: true,
	passwordHiddenValue: 'password',
	init(){
		this._super(...arguments);
		this.set('passwordHidden', true);
		this.set('passwordHiddenValue', 'password');
	},
	willTransition(){
		this.set('passwordHidden', true);
		this.set('passwordHiddenValue', 'password');
	},
	actions:{
		login: function(){
			this.auth.login();
		},
		logout: function(){
			this.auth.logout();
		},
		togglePasswordHidden() {
			if (this.passwordHidden) {
				this.set('passwordHidden', false);
				this.set('passwordHiddenValue', 'text');
			} else {
				this.set('passwordHidden', true);
				this.set('passwordHiddenValue', 'password');
			}
		}
	}
});
