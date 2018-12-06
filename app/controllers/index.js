import { computed, observer } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({

  isDisabled: false,

  emailAddress: 'test@testunomahaconnection.com.net.fail',

  actualEmailAddress: computed('emailAddress', function() {
    console.log('actualEmailAddress function is called: ', this.get('emailAddress'));
  }),

  emailAddressChanged: observer('emailAddress', function() {
    console.log('observer is called', this.get('emailAddress'));
  })

});
