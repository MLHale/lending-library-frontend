import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

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

	model() {
		return RSVP.hash({
			categories: this.store.findAll("category"),
			itemtypes: this.store.findAll("itemtype")
		});
	},

	actions: {
		willTransition() {
			this.controller.set('currentStep', 1);
			this.controller.set('removalQuantity', 0);
			this.controller.set('selectedItemtype', null);
			this.controller.set('selectedCategory', null);
		}
	}
});
