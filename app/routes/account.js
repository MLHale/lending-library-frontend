import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

export default Route.extend({
    auth: service('auth-manager'),
    async afterModel() {
      let route = this;

      let loggedIn = await this.get('auth').get('isLoggedIn');
      console.log(loggedIn);
      if(!(this.get('auth').get('isLoggedIn'))){
        route.transitionTo('login');
      }
    },
    model() {
      return RSVP.hash({
        user: this.get('auth').get('user'),
        profile: this.get('auth').get('profile'),
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
