/**
 * @Author: Matthew Hale <matthale>
 * @Date:   2018-03-01T00:55:38-06:00
 * @Email:  mlhale@unomaha.edu
 * @Filename: notification-messages.js
 * @Last modified by:   matthale
 * @Last modified time: 2018-03-02T01:58:04-06:00
 * @Copyright: Copyright (C) 2018 Matthew L. Hale
 */


 /**
	 Inject notification service into other routes, controllers, and components for later use.
 **/
export function initialize(application) {
  application.inject('route', 'notifications', 'service:notification-messages');
  application.inject('controller', 'notifications', 'service:notification-messages');
  application.inject('component', 'notifications', 'service:notification-messages');

}

export default {
  name: 'notification-messages',
  initialize
};
