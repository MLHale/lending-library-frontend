import Controller from '@ember/controller';
import { filterBy } from '@ember/object/computed';

export default Controller.extend({
	pendingOrders: filterBy('model', 'fulfilledon', null),
	returnOrders: filterBy('model', 'returnedon', null),
});
