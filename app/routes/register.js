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
    },

    actions: {
      willTransition() { // TODO: FIX THIS
        const userRecord = this.controller.get('model');
        this.controller.get('model.profile').rollbackAttributes();

        console.log(userRecord);
        // console.log(profileRecord);
        
        // toss record changes (or the entire record itself) if it hasn't been saved
        // if (profileRecord.get('hasDirtyAttributes')) {
        //   profileRecord.rollbackAttributes();
        // }

        if (userRecord.get('hasDirtyAttributes')) {
          userRecord.rollbackAttributes();
        }

        
      }
    }
});
