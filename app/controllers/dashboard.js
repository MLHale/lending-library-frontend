import Controller from '@ember/controller';
import { filterBy } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Controller.extend({
    pendingOrders: filterBy('model.checkouts', 'fulfilledon', null),
    returnOrders: filterBy('model.checkouts', 'returnedon', null),
    auth: service('auth-manager'),
    init: function() {
        this._super(...arguments);

        // TODO: Check for admin privelages here
        // if(!(this.get('auth').get('isLoggedIn'))){
        //     this.transitionToRoute('login');
        // }
    },
});
