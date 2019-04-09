/**
 * @Author: Matthew Hale <matthale>
 * @Date:   2018-05-17T15:53:43-05:00
 * @Email:  mlhale@unomaha.edu
 * @Filename: login.js
 * @Last modified by:   matthale
 * @Last modified time: 2018-05-17T17:10:52-05:00
 * @Copyright: Copyright (C) 2018 Matthew L. Hale
 */



import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
	auth: service('auth-manager'),
	actions:{
		login: function(){
			this.get('auth').login();
		},
		logout: function(){
			this.get('auth').logout();
		}
	}
});
