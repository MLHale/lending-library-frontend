import Controller from '@ember/controller';
import { inject } from '@ember/service';
// import $ from 'jquery';

export default Controller.extend({
    router: inject(),

    actions: {
        complete(checkout) {

            // function down(the) {
            //     $("#success-alert").slideUp(500, transition(the));
            // }

            // function transition(thing) {
            //     thing.get('router').transitionTo('fulfill');
            // }

            checkout.set('fulfilledon', new Date().toISOString());
            checkout.save();

            // $("#success-alert")
            // .fadeTo(1000, 500)
            // .slideDown(500, down(this));


            // 2019-05-22T12:00:00Z
        }
    }
});
