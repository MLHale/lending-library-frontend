import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.bURL
});

Router.map(function() {
  this.route('home', { path: '/' });
  this.route('tasks');
  this.route('about');
  this.route('library', { path: '/library' });
  this.route('packages', { path: '/packages' });
  this.route('cart', { path: '/cart' });
  this.route('checkout', { path: '/checkout' });
  this.route('login', { path: '/login' });
  this.route('404', { path: '*:'});
});

export default Router;
