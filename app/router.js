import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.bURL
});

Router.map(function() {
  this.route('about', { path: '/about' });
  this.route('cart', { path: '/cart' });
  this.route('checkout', { path: '/checkout' });
  this.route('login', { path: '/login' });

  this.route('library', { path: '/library' }, function() {
    this.route('library-items', { path: '/:category_id' });
  });

  this.route('return', { path: '/return' }, function() {
    this.route('return-items', { path: '/:checkout_id' });
  });

  this.route('fulfill', { path: '/fulfill' }, function() {
    this.route('fulfill-order', { path: '/:checkout_id' });
  });

  this.route('manage', { path: '/manage' }, function() {
    this.route('manage-order', { path: '/:checkout_id' });
  });
  this.route('dashboard');
  this.route('register');
});

export default Router;
