import Service, { inject as service } from '@ember/service';

export default Service.extend({
	store: service('store'),
	cart: service('shopping-cart'),
	router: service(),

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
	async login(){

		// Retrieve field data
		let username = this.username;
		let password = this.password;
		let remember = this.remember;

		let auth = this;

		let formData = new FormData();
		formData.append('username', username);
		formData.append('password', password);
		formData.append('remember', remember);

		let response = await fetch('/api/session', { body: formData, method: "post" });
		if (response.ok) {
			let resp = await response.json();
			if (resp.data.isauthenticated) {
				// Successful Login
				console.log('Login POST Request to /api/session/ was successful.');
				auth.get('store').findRecord('profile', resp.data.profileid).then(
					function (profile) {
						auth.set('profile', profile);
					}
				);
				auth.get('store').findRecord('user', resp.data.userid).then(
					function (user) {
						auth.set('user', user);
					}
				);

				if (remember) {
					//save username and pass to local storage
					localStorage.setItem('remember', true);
					localStorage.setItem('username', auth.get('username'));
					localStorage.setItem('password', auth.get('password'));
				} else {
					//failure
					localStorage.removeItem('remember');
					localStorage.removeItem('username');
					localStorage.removeItem('password');
				}

				auth.set('password', '');
				auth.set('isLoggedIn', true);

				if (auth.get('user.issuperuser')) {
					auth.get('router').transitionTo('admin.index');
				} else {
					auth.get('router').transitionTo('library.index');
				}

			} else {
				console.log('Login POST Request to /api/session/ was unsuccessful.');
				auth.set('errorMsg', resp.data.message);
			}
		} else {
			auth.set('errorMsg', 'Incorrect Username or Password');
		}

	},
	/**
		De-authenticates against session endpoint on backend (at /api/session)
	**/
	logout(){
		let auth = this;
		auth.get('cart').empty();

		fetch('/api/session/', { method: 'DELETE' } ).then( res => {
			if (res.ok) {
				auth.set('isLoggedIn', false);
				auth.set('errorMsg', '');
				auth.set('username', '');
				auth.set('user', null);
				auth.set('profile', null);

				if (localStorage.remember) {
					auth.set('remember', localStorage.remember);
					auth.set('username', localStorage.username);
					auth.set('password', localStorage.password);
				}

				auth.get('router').transitionTo('login');

				return Promise.resolve('User logged out.');
			} else {
				return Promise.reject('An error occurred.');
			}
		})
	},

	async getLoginStatus() {
		// Check if the user is logged in to the API

		let response = await fetch('/api/session');
		if(response.ok) {
			let json = await response.json();
			return json
		}
	},

	/**
		Called whenever the application loads to initialize any stored session/local variables
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
					auth.get('store').findRecord('user', resp.data.userid).then((user) => {
						auth.set('user', user);
						auth.set('profile', profile);
					});
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
