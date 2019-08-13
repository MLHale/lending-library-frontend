import Controller from '@ember/controller';
// import { observer } from '@ember/object';
import $ from 'jquery';

export default Controller.extend({
	// confirmpassword: '',
	// showPolicy: false,
	// success: false,
	// validationErrorMsg: "",
	// showError: false,

	// //client-side validators
	// usernameChanged: observer('content.user.username', function(){
	// 	var user = this.get('content').user;
	// 	if (user.get('username') === undefined) {
	// 		this.set('usernameclasses', null);
	// 		this.set('usernameIcon', 'chevron-left');
	// 	} else if (!/^[a-z0-9]+$/i.test(user.get('username'))){
	// 		this.set('usernameerror', 'Username must contain only alphanumeric characters');
	// 		this.set('usernameclasses', 'has-error');
	// 		this.set('usernameIcon', 'remove');
	// 	} else {
	// 		this.set('usernameerror', null);
	// 		this.set('usernameclasses', 'has-success');
	// 		this.set('usernameIcon', 'ok');
	// 	}
	// }),
	// emailChanged: observer('content.user.email', function(){
	// 	var user = this.get('content').user;
	// 	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	// 	if (user.get('email') === undefined ) {
	// 		this.set('emailclasses', null);
	// 		this.set('emailIcon', 'chevron-left');
	// 	} else if (!re.test(user.get('email'))) {
	// 		this.set('emailerror', 'Enter a valid email');
	// 		this.set('emailclasses', 'has-error');
	// 		this.set('emailIcon', 'remove');
	// 	} else {
	// 		this.set('emailclasses', 'has-success');
	// 		this.set('emailIcon', 'ok');
	// 	}
	// }),
	// passwordChanged: observer('content.user.password', function(){
	// 	var user = this.get('content').user;
	// 	if (user.get('password')===undefined || user.get('password')===''){
	// 			this.set('passwordclasses', null);
	// 			this.set('passwordIcon', 'chevron-left');
	// 	}
	// 	else if (user.get('password').length<8){
	// 		this.set('passwordclasses', 'has-error');
	// 		this.set('passwordIcon', 'remove');
	// 	}
	// 	else {
	// 		this.set('passwordclasses', 'has-success');
	// 		this.set('passwordIcon', 'ok');
	// 	}
	// }),
	// passwordConfirmChanged: observer('content.user.confirmpassword', function(){
	// 	var user = this.get('content').user;
	// 	if (user.get('confirmpassword')===undefined || user.get('confirmpassword')===''){
	// 			this.set('confirmpasswordclasses', null);
	// 			this.set('confirmpasswordIcon', 'chevron-left');
	// 	}
	// 	else if (user.get('password') !== user.get('confirmpassword')){
	// 		this.set('confirmpasswordclasses', 'has-error');
	// 		this.set('confirmpasswordIcon', 'remove');
	// 	} else {
	// 		this.set('confirmpasswordclasses', 'has-success');
	// 		this.set('confirmpasswordIcon', 'ok');
	// 	}
	// }),
	// firstnameChanged: observer('content.profile.firstname', function(){
	// 	var profile = this.get('content').profile;
	// 	if (profile.get('firstname')===undefined || profile.get('firstname')===''){
	// 		this.set('firstnameclasses', null);
	// 		this.set('firstnameIcon', 'chevron-left');
	// 	} else if (!/^[a-z]+$/i.test(profile.get('firstname'))){
	// 		this.set('firstnameclasses', 'has-error');
	// 		this.set('firstnameIcon', 'remove');
	// 	} else {
	// 		this.set('firstnameclasses', 'has-success');
	// 		this.set('firstnameIcon', 'ok');
	// 	}
	// }),
	// lastnameChanged: observer('content.profile.lastname', function(){
	// 	var profile = this.get('content').profile;
	// 	if (profile.get('lastname')===undefined || profile.get('lastname')===''){
	// 		this.set('lastnameclasses', null);
	// 		this.set('lastnameIcon', 'chevron-left');
	// 	} else if (!/^[a-z]+$/i.test(profile.get('lastname'))){
	// 		this.set('lastnameclasses', 'has-error');
	// 		this.set('lastnameIcon', 'remove');
	// 	} else {
	// 		this.set('lastnameclasses', 'has-success');
	// 		this.set('lastnameIcon', 'ok');
	// 	}
	// }),
	// ageChanged: observer('content.profile.age', function(){
	// 	var profile = this.get('content').profile;
	// 	if (profile.get('age')===undefined || profile.get('age')===''){
	// 		this.set('ageClass', null);
	// 		this.set('ageIcon', 'chevron-left');
	// 	} else if (!/^[0-9]+$/i.test(profile.get('age'))){
	// 		this.set('ageClass', 'has-error');
	// 		this.set('ageIcon', 'remove');
	// 	} else {
	// 		this.set('ageClass', 'has-success');
	// 		this.set('ageIcon', 'ok');
	// 	}
	// }),
	//...other validators go here

	//actions
	actions: {
		register: function(){
			// this.set('validationErrorMsg', '');
			// var user = this.get('content').user;
			// var profile = this.get('content').profile;
			var controller = this;

			//probably want to do some additional validation here
			if(controller.get('password') === controller.get('confirm')){
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
						}
						else if(response.data.email){
							errMsg = response.data.email;
						}
						else {
							errMsg = "An unknown error occured. Please try again";
						}
						controller.set('validationErrorMsg', errMsg);
					}
					else{
						//success
						controller.set('success', true);
						controller.get('auth').set('username',controller.get('username'))
						controller.get('auth').set('password',controller.get('password'))

						controller.transitionToRoute('login');
					}


				});
			}
			else {
				this.set('validationErrorMsg', 'Passwords don\'t match');
			}

		},
		closeError: function(){
			this.set('showError', false);
			this.set('validationErrorMsg', '');
		}
	}
});
