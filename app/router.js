import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.bURL
});

Router.map(function() {
  this.route('tasks');
  this.route('about');
  this.route('library', { path: '/library' }, function() {
    this.route('library-items', { path: '/:category_id' });
  });
  this.route('cart', { path: '/cart' });
  this.route('checkout', { path: '/checkout' });
  this.route('login', { path: '/login' });
});

export default Router;
