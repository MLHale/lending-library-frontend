/**
 * @Author: Matthew Hale <matthale>
 * @Date:   2018-03-01T00:50:22-06:00
 * @Email:  mlhale@unomaha.edu
 * @Filename: auth-manager.js
 * @Last modified by:   matthale
 * @Last modified time: 2018-03-02T01:57:50-06:00
 * @Copyright: Copyright (C) 2018 Matthew L. Hale
 */


 /**
	 Inject auth service into other routes, controllers, and components for later use.
 **/
export function initialize(application) {
	application.inject('route', 'auth', 'service:auth-manager');
	application.inject('controller', 'auth', 'service:auth-manager');
	application.inject('component', 'auth', 'service:auth-manager');
}

export default {
	name: 'auth-manager',
	initialize: initialize
};
