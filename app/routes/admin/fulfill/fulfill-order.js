import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
	auth: service('auth-manager'),
	store: service('store'),
	async beforeModel() {
		let route = this;
		let status = await route.get('auth').getLoginStatus();
		if (status.data.isauthenticated) {
			route.get('store').findRecord('user', status.data.userid).then(
				function (user) {
					if (!(user.get('issuperuser'))) {
						route.transitionTo('login');
					}
				}
			);
		} else {
			route.transitionTo('login');
		}
	},

	model(params) {
		return this.store.findRecord("checkout", params.checkout_id);
	}
});
