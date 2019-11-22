import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

    auth: service('auth-manager'),

    async beforeModel() {
        let route = this;
        let loggedIn = await route.get('auth').getLoginStatus();
        if (!(loggedIn.data.isauthenticated) || !(loggedIn.data.issuperuser)) {
            route.transitionTo('login');
        }
    },

    model(params) {
        return this.store.findRecord("checkout", params.checkout_id);
    }
});
