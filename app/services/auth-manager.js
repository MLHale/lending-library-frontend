/**
 * @Author: Matthew Hale <mlhale>
 * @Date:   2018-02-22T22:39:20-06:00
 * @Email:  mlhale@unomaha.edu
 * @Filename: auth-manager.js
 * @Last modified by:   matthale
 * @Last modified time: 2018-03-01T17:24:09-06:00
 * @Copyright: Copyright (C) 2018 Matthew L. Hale
 */



import Ember from 'ember';

export default Ember.Service.extend({
	store: Ember.inject.service('store'),
	routing: Ember.inject.service('-routing'),
	notifications: Ember.inject.service('notification-messages'),

	//field vars
	username: '',
	password: '',
	remember: false,
	errorMsg: '',

	//stored data
	user: null,
	profile: null,
	isLoggedIn: false,

	/**
		Authenticates against session endpoint on backend (at /api/session)
	**/
	login: function(){
		console.log('Logging in:');

		//retrieve field data
		var username = this.get('username');
		var password = this.get('password');
		var remember = this.get('remember');

		var data = {
			'username': username,
			'password': password};
		var auth = this;

		//make api request
		Ember.$.post('/api/session/', data, function(response){

			if(response.data.isauthenticated){
				//success
				console.log('Login POST Request to /api/session/ was successful.');
				auth.get('store').findRecord('profile', response.data.profileid, {include: 'user,areasofinterest'}).then(
					function(profile){
						auth.set('user',profile.get('user'));
						// transition after the profile is loaded
						auth.set('profile',profile);
            if (auth.get('routing.router.currentPath')==='login'){
              // transition if on the login page
              auth.get('routing').transitionTo('awards');
            }
					}
				);
				auth.set('isLoggedIn', true);

				if(remember){
					//save username and pass to local storage
					localStorage.setItem('remember', true);
					localStorage.setItem('username', auth.get('username'));
					localStorage.setItem('password', auth.get('password'));
				}
				else{
					//failure
					localStorage.removeItem('remember');
					localStorage.removeItem('username');
					localStorage.removeItem('password');
				}
				auth.set('password', '');
				auth.set('errorMsg', '');
				auth.get('notifications').success(`Login successful. Loading your data...`, {
					clearDuration: 3000,
					autoClear: true
				});

			} else{
				//errors
				console.log('Login POST Request to /api/session/ was unsuccessful.');
				auth.set('errorMsg', response.data.message);
				auth.get('notifications').warning(`${response.data.message}`, {
					clearDuration: 3000,
					autoClear: true
				});
			}
		});

	},
	/**
		De-authenticates against session endpoint on backend (at /api/session)
	**/
	logout: function(){
		console.log('Logging out');
		var auth = this;
		Ember.$.ajax({url: '/api/session/', type: 'DELETE'}).then(
			function(response){
				console.log('Logout DELETE Request to /api/session/ was successful:' + response);
				auth.set('isLoggedIn', false);
				auth.set('errorMsg', '');
				auth.set('username', '');
				auth.set('user', null);
				auth.set('profile', null);

				if(localStorage.remember) {
					auth.set('remember', localStorage.remember);
					auth.set('username', localStorage.username);
					auth.set('password', localStorage.password);
				}
				auth.get('notifications').success(`You are now logged out!`, {
					clearDuration: 3000,
					autoClear: true
				});
				auth.get('routing').transitionTo('login');

			}
		);
	},
	/**
		called whenever the application loads to initialize any stored session/local variables
	**/
	init: function(){
		this._super();
		var auth = this;

		//handle session and local variable loading
		auth.set('remember', localStorage.remember);

		if(auth.get('remember')){
			auth.set('username', localStorage.username);
			auth.set('password', localStorage.password);
		}

		//check to see if the user is logged into the API
		Ember.$.get('/api/session', function(response){
			if(response.data.isauthenticated){
				//success
				console.log('The user: \''+response.data.username+'\' is currently logged in.');
				auth.get('store').findRecord('profile', response.data.profileid, {include: 'user,areasofinterest'}).then(
					function(profile){
						auth.set('user',profile.get('user'));
						auth.set('profile',profile);
						if (auth.get('routing.router.currentPath')==='login'){
							// transition if on the login page
							auth.get('routing').transitionTo('awards');
						}
					}
				);
				auth.set('isLoggedIn', true);
				auth.set('password', '');
			} else{
				//errors
				console.log('The user is not currently logged in.');
			}
		});
	}
});
