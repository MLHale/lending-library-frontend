import Service from '@ember/service';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default Service.extend({
	store: service('store'),
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
			'password': password };
		var auth = this;

		//make api request
		$.post('/api/session/', data, function(response){

			if(response.data.isauthenticated){
				//success
				console.log('Login POST Request to /api/session/ was successful.');
				auth.get('store').findRecord('profile', response.data.profileid).then(
					function(profile){
						auth.set('user',profile.get('user'));
						// transition after the profile is loaded
						auth.set('profile',profile);
						auth.set('password', '');
						// if(profile.get('roles').admin) {
						// 	auth.get('router').transitionTo('dashboard');
						// } else {
							auth.get('router').transitionTo('library.index');     // TODO: Fix this
						// }
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
				console.log('The user: \''+response.data.username+'\' is currently logged in.');
				auth.get('store').findRecord('profile', response.data.profileid).then(
					function(profile){
						auth.set('user',profile.get('user'));
						auth.set('profile',profile);
						if (auth.get('router._router.currentPath')==='login'){
							// transition if on the login page
							// if(profile.get('roles').admin) {
							// 	auth.get('router').transitionTo('dashboard');
							// } else {
								auth.get('router').transitionTo('library.index');     // TODO: Fix this
							// }
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
