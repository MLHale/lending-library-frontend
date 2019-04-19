/**
 * @Author: Matthew Hale <mlhale>
 * @Date:   2018-02-22T22:39:20-06:00
 * @Email:  mlhale@unomaha.edu
 * @Filename: auth-manager.js
 * @Last modified by:   mlhale
 * @Last modified time: 2018-12-04T00:55:55-06:00
 * @Copyright: Copyright (C) 2018 Matthew L. Hale
 */



import Service from '@ember/service';
import { inject as service } from '@ember/service';
import $ from 'jquery';
// import { later } from '@ember/runloop';

export default Service.extend({
	store: service(),
	router: service(),

	//field vars
	username: '',
	password: '',
	remember: false,
	errorMsg: '',

	//stored data
	user: null,
	profile: null,
	isLoggedIn: false,
	shownav: true,

	/**
		Authenticates against session endpoint on backend (at /api/session)
	**/
	login: function(callback){
		console.log('Logging in:');

		//retrieve field data
		var username = this.get('username');
		var password = this.get('password');
		var remember = this.get('remember');
		console.log('1');
		var data = {
			'username': username,
			'password': password};
		console.log('2');
		var auth = this;
		console.log('3');
		//make api request
		$.post('/api/session/', data, function(response){
			console.log('4');
			if(response.data.isauthenticated){
				//success
				console.log('Login POST Request to /api/session/ was successful.');
				auth.set('user', response.data.username);
				console.log(auth.get('user') + " was logged in");
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
				console.log('5');
				auth.get('store').findRecord('userprofile', response.data.profileid, {include: 'org'}).then(
					function(profile){
						console.log('6');
						// transition after the profile is loaded
						auth.set('profile',profile);
						auth.set('password', '');
						if (callback){
							// does not currently appear to be used
							console.log('Executing callback');
							callback();
						}
						else {
							if(profile.get('isadmin')) {
								console.log("profile.get('isadmin') returned true");
							} else {
								console.log("profile.get('isadmin') returned false");
							}
						}
					}
				);
				console.log(7);
				auth.set('isLoggedIn', true);
			} else{
				//errors
				console.log('Login POST Request to /api/session/ was unsuccessful.');
				auth.set('errorMsg', response.data.message);
			}
		});
	},
	/**
		De-authenticates against session endpoint on backend (at /api/session)
	**/
	logout: function(){
		console.log('Logging out');
		var auth = this;
		$.ajax({url: '/api/session/', type: 'DELETE'}).then(
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

				auth.get('router').transitionTo('login');

			}
		);
	},
	/**
		called whenever the application loads to initialize any stored session/local variables
	**/
	init: function(){
		this._super();
		var auth = this;

		let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

		auth.set('isChrome', isChrome);

		//handle session and local variable loading
		auth.set('remember', localStorage.remember);
		if(auth.get('remember')){
			auth.set('username', localStorage.username);
			auth.set('password', localStorage.password);
		}


		//check to see if the user is logged into the API
		$.get('/api/session', function(response){
			if(response.data.isauthenticated){
				//success
				auth.set('user', response.data.username)
				console.log('The user: \''+response.data.username+'\' is currently logged in.');
				auth.get('store').findRecord('userprofile', response.data.profileid /*, {include: 'experimentsessions,user,experimentsessions.subjectsessions'}*/).then(
					function(profile){
						auth.set('profile',profile);
						if (auth.get('router._router.currentPath')==='login'){
							// transition if on the login page
							if(profile.get('isadmin')) {
								console.log("profile.get('isadmin') returned true");
							} else {
								console.log("profile.get('isadmin') returned false");
							}
						}
					}
				);
				auth.set('isLoggedIn', true);
				auth.set('password', '');

			}
			else{
				//errors
				console.log('The user is not currently logged in.');
			}
		});


	}
});
