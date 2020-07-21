import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default Route.extend({
	auth: service('auth-manager'),

	model() {
		return RSVP.hash({
			categories: this.store.findAll('category'),
			itemtypes: this.store.findAll('itemtype'),
			newCheckout: this.store.createRecord('checkout'),
		})
	},

	setupController(controller, model) {
		this._super(...arguments);
		controller.setProperties({
			showAlert: false,
			isRegistered: false,
			showCode: false,
			didValidate: false
		});
		controller.set('model', model);
	},
});
