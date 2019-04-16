export function initialize(application) {
  application.inject('route', 'login', 'service:auth-manager'); // verify parameter functionality
}

export default {
  initialize
};
