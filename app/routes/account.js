import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    auth: service('auth-manager'),

    async beforeModel() {
      let route = this;
      let loggedIn = await route.get('auth').getLoginStatus();
      if(!(loggedIn.data.isauthenticated)){
        route.transitionTo('login');
      }
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
