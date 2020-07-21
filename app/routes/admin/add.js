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
			this.controller.set('addingNewCategory', false);
			this.controller.set('addingNewItem', false);
			this.controller.set('newItemQuantity', 0);

			this.controller.set('newCategoryDescription', "");
			this.controller.set('newCategoryImage', "");
			this.controller.set('newCategoryName', "");
			this.controller.set('newItemDescription', "");
			this.controller.set('newItemName', "");
			this.controller.set('newItemQuantity', 0);
			this.controller.set('selectedCategory', null);
			this.controller.set('selectedItemtype', "");
		}
	}
});
