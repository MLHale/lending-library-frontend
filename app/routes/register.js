import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    auth: service('auth-manager'),

    async beforeModel() {
      let route = this;
      let loggedIn = await route.auth.getLoginStatus();
      if(loggedIn.data.isauthenticated){
        route.transitionTo('account');
      }
    },
    
    model() {
        return this.store.createRecord('user', {
          profile: this.store.createRecord('profile')
        });
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

    actions: {
      willTransition() {
        const userRecord = this.controller.get('model');
        this.controller.get('model.profile').rollbackAttributes();

        if (userRecord.get('hasDirtyAttributes')) {
          userRecord.rollbackAttributes();
        }

        
      }
    }
});
