import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        return this.store.createRecord('user', {
          profile: this.store.createRecord('profile')
        });
    },

    setupController(controller) {
        controller.setProperties({
          showAlert: false,
          isRegistered: false,
          showCode: false,
          didValidate: false
        });
    
        this._super(...arguments);
    }
});
