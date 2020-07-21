import Route from "@ember/routing/route";
import RSVP from 'rsvp';

export default Route.extend({
	model(params) {
		return RSVP.hash({
			itemtypes: this.store.query('itemtype', { 'category': params.category_id }),
			category: this.store.findRecord('category', params.category_id)
		});
	}
});