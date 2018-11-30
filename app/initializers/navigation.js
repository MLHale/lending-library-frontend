/**
 * @Author: Matthew Hale <matthale>
 * @Date:   2018-03-01T00:29:37-06:00
 * @Email:  mlhale@unomaha.edu
 * @Filename: navigation.js
 * @Last modified by:   matthale
 * @Last modified time: 2018-03-02T01:57:58-06:00
 * @Copyright: Copyright (C) 2018 Matthew L. Hale
 */


 /**
	 Inject navigation service into other routes, controllers, and components for later use.
 **/
export function initialize(application) {
  application.inject('component', 'navigation', 'service:navigation');
  application.inject('controller', 'navigation', 'service:navigation');
  application.inject('route', 'navigation', 'service:navigation');
}

export default {
  initialize
};
