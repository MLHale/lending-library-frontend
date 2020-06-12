import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
	store: service('store'),
	cart: service('shopping-cart'),
	router: service(),
	ajax: service(),

	// Field data
	username: '',
	password: '',
	remember: false,
	errorMsg: '',

	// Stored data
	user: null,
	profile: null,
	isLoggedIn: false,

	/**
		Authenticates against session endpoint on backend (at /api/session)
	**/
	login(){

		// Retrieve field data
		let username = this.get('username');
		let password = this.get('password');
		let remember = this.get('remember'); // TODO: Implement this

		let auth = this;

		auth.get('ajax').post('/api/session', { data: { username: username, password: password } }).then((resp) => {
			console.log(resp);
			if(resp.data.isauthenticated) {
				// Successful Login
				console.log('Login POST Request to /api/session/ was successful.');
				auth.get('store').findRecord('profile', resp.data.profileid).then(
					function(profile){
						auth.set('profile', profile);
						
					}
				);
				auth.get('store').findRecord('user', resp.data.userid).then(
					function (user) {
						auth.set('user', user);
					}
				);
				
				auth.set('password', '');
				auth.set('isLoggedIn', true);

				if (auth.get('user.issuperuser')) {
					auth.get('router').transitionTo('dashboard');
				} else {
					auth.get('router').transitionTo('library.index');
				}

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
			} else {
				console.log('Login POST Request to /api/session/ was unsuccessful.');
				auth.set('errorMsg', resp.data.message);
			}
		});

	},
	/**
		De-authenticates against session endpoint on backend (at /api/session)
	**/
	logout(){
		let auth = this;
		auth.get('cart').empty();
		auth.get('ajax').del('/api/session/').then(() => {
			console.log('Logout DELETE Request to /api/session/ was successful');
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

		});
	},

	async getLoginStatus() {
		let auth = this;

		// Check if the user is logged in to the API
		return await auth.get('ajax').request('/api/session').then((resp) => {
			return resp;
		});
	},

	/**
		Called whenever the application loads to initialize any stored session/local letiables
	**/
	init(){
		this._super();
		let auth = this;

		// Handle session and local letiable loading
		auth.set('remember', localStorage.remember);

		if(auth.get('remember')){
			auth.set('username', localStorage.username);
			auth.set('password', localStorage.password);
		}

		auth.getLoginStatus().then((resp) => {
			if(resp.data.isauthenticated){
				// Success
				console.log('The user: \'' + resp.data.username + '\' is currently logged in.');
				auth.get('store').findRecord('profile', resp.data.profileid).then((profile) => {
					auth.set('user', profile.get('user'));
					auth.set('profile', profile);
				});
				auth.set('isLoggedIn', true);
				auth.set('password', '');

			} else {
				// Errors
				console.log('The user is not currently logged in.');
			}
		});
	}
});
