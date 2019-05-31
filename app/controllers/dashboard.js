import Controller from '@ember/controller';
import { filterBy } from '@ember/object/computed';

export default Controller.extend({
    pendingOrders: filterBy('model.checkouts', 'fulfilledon', null)
});
