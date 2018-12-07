import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('tasks');
  this.route('about');
  this.route('library');
  this.route('projects');
  this.route('cart');
  this.route('checkout');
  this.route('login');
  this.route('register');
});

export default Router;
