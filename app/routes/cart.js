import Route from '@ember/routing/route';

export default Route.extend({
	model() {
		return this.store.findAll('checkout').reverseObjects();
	},
	actions: {
		willTransition: function() {
            var appController = this.controllerFor('cart');
            appController.set('confirm', false);
        }
	}
});