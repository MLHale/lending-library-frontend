import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	auth: service('auth-manager'),

	async beforeModel() {
		let route = this;
		let loggedIn = await route.get('auth.user');
		console.log(loggedIn)
		// if (!(loggedIn)) {
		// 	route.transitionTo('login');
		// }
	},

	model() {
		return this.store.findAll("checkout");
	}
});
