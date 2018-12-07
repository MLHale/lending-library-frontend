export function initialize(application) {
	application.inject('route', 'auth', 'service:auth-manager');
	application.inject('controller', 'auth', 'service:auth-manager');
	application.inject('component', 'auth', 'service:auth-manager');
}

export default {
	name: 'auth-manager',
	initialize: initialize
};
