import Controller from '@ember/controller';
import { filterBy } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Controller.extend({
    auth: service('auth-manager'),
    init: function() {
        this._super(...arguments)

        // TODO: Check for admin privelages here
        if(!(this.get('auth').get('isLoggedIn'))){
            this.transitionToRoute('login');
        }
    },
    checkouts: filterBy('model', 'fulfilledon', null)
});
