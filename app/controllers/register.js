/**
 * @Author: Matthew Hale <mlhale>
 * @Date:   2017-08-16T15:35:25-05:00
 * @Email:  mlhale@unomaha.edu
 * @Filename: register.js
 * @Last modified by:   matthale
 * @Last modified time: 2018-05-17T17:10:17-05:00
 * @Copyright: Copyright (C) 2018 Matthew L. Hale
 */



import Controller from '@ember/controller';
import { observer } from '@ember/object';
import $ from 'jquery';

export default Controller.extend({
	confirmpassword: '',
	showPolicy: false,
	success: false,
	genders: ['Male', 'Female', 'Other'],
	educationLevels: ['Some highschool','Highschool', 'Some college(2 years or less)', 'Bachelor\'s degree', 'Graduate degree'],
	states: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District Of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
	agree: false,
	validationErrorMsg: "",
	showError: false,

	//client-side validators
	usernameChanged: observer('content.user.username', function(){
		var user = this.get('content').user;
		if (user.get('username') === undefined) {
			this.set('usernameclasses', null);
			this.set('usernameIcon', 'chevron-left');
		} else if (!/^[a-z0-9]+$/i.test(user.get('username'))){
			this.set('usernameerror', 'Username must contain only alphanumeric characters');
			this.set('usernameclasses', 'has-error');
			this.set('usernameIcon', 'remove');
		} else {
			this.set('usernameerror', null);
			this.set('usernameclasses', 'has-success');
			this.set('usernameIcon', 'ok');
		}
	}),
	emailChanged: observer('content.user.email', function(){
		var user = this.get('content').user;
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (user.get('email') === undefined ) {
			this.set('emailclasses', null);
			this.set('emailIcon', 'chevron-left');
		} else if (!re.test(user.get('email'))) {
			this.set('emailerror', 'Enter a valid email');
			this.set('emailclasses', 'has-error');
			this.set('emailIcon', 'remove');
		} else {
			this.set('emailclasses', 'has-success');
			this.set('emailIcon', 'ok');
		}
	}),
	passwordChanged: observer('content.user.password', function(){
		var user = this.get('content').user;
		if (user.get('password')===undefined || user.get('password')===''){
				this.set('passwordclasses', null);
				this.set('passwordIcon', 'chevron-left');
		}
		else if (user.get('password').length<8){
			this.set('passwordclasses', 'has-error');
			this.set('passwordIcon', 'remove');
		}
		else {
			this.set('passwordclasses', 'has-success');
			this.set('passwordIcon', 'ok');
		}
	}),
	passwordConfirmChanged: observer('content.user.confirmpassword', function(){
		var user = this.get('content').user;
		if (user.get('confirmpassword')===undefined || user.get('confirmpassword')===''){
				this.set('confirmpasswordclasses', null);
				this.set('confirmpasswordIcon', 'chevron-left');
		}
		else if (user.get('password') !== user.get('confirmpassword')){
			this.set('confirmpasswordclasses', 'has-error');
			this.set('confirmpasswordIcon', 'remove');
		} else {
			this.set('confirmpasswordclasses', 'has-success');
			this.set('confirmpasswordIcon', 'ok');
		}
	}),
	firstnameChanged: observer('content.profile.firstname', function(){
		var profile = this.get('content').profile;
		if (profile.get('firstname')===undefined || profile.get('firstname')===''){
			this.set('firstnameclasses', null);
			this.set('firstnameIcon', 'chevron-left');
		} else if (!/^[a-z]+$/i.test(profile.get('firstname'))){
			this.set('firstnameclasses', 'has-error');
			this.set('firstnameIcon', 'remove');
		} else {
			this.set('firstnameclasses', 'has-success');
			this.set('firstnameIcon', 'ok');
		}
	}),
	lastnameChanged: observer('content.profile.lastname', function(){
		var profile = this.get('content').profile;
		if (profile.get('lastname')===undefined || profile.get('lastname')===''){
			this.set('lastnameclasses', null);
			this.set('lastnameIcon', 'chevron-left');
		} else if (!/^[a-z]+$/i.test(profile.get('lastname'))){
			this.set('lastnameclasses', 'has-error');
			this.set('lastnameIcon', 'remove');
		} else {
			this.set('lastnameclasses', 'has-success');
			this.set('lastnameIcon', 'ok');
		}
	}),
	ageChanged: observer('content.profile.age', function(){
		var profile = this.get('content').profile;
		if (profile.get('age')===undefined || profile.get('age')===''){
			this.set('ageClass', null);
			this.set('ageIcon', 'chevron-left');
		} else if (!/^[0-9]+$/i.test(profile.get('age'))){
			this.set('ageClass', 'has-error');
			this.set('ageIcon', 'remove');
		} else {
			this.set('ageClass', 'has-success');
			this.set('ageIcon', 'ok');
		}
	}),
	cityChanged: observer('content.profile.city', function(){
		var profile = this.get('content').profile;
		if (profile.get('city')===undefined || profile.get('city')===''){
			this.set('cityClass', null);
			this.set('cityIcon', 'chevron-left');
		} else if (!/^[a-zA-Z]+$/i.test(profile.get('city'))){
			this.set('cityClass', 'has-error');
			this.set('cityIcon', 'remove');
		} else {
			this.set('cityClass', 'has-success');
			this.set('cityIcon', 'ok');
		}
	}),
	//...other validators go here

	//actions
	actions: {
		showPolicy: function(){
			this.set('showPolicy', !this.get('showPolicy'));
		},
		register: function(){
			this.set('validationErrorMsg', '');
			var user = this.get('content').user;
			var profile = this.get('content').profile;
			var controller = this;

			//probably want to do some additional validation here
			if(user.get('password') === user.get('confirmpassword')){
				var requestdata = {
					'username': user.get("username"),
					'password': user.get('password'),
					'email': user.get('email'),
					'firstname': profile.get('firstname'),
					'lastname': profile.get('lastname'),
					'gender': profile.get('gender'),
					'age': profile.get('age'),
					'educationlevel': profile.get('educationlevel'),
					'city': profile.get('city'),
					'state': profile.get('state'),
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
						controller.get('auth').set('username',user.get('username'))
						controller.get('auth').set('password',user.get('password'))

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
