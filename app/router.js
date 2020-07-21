import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.bURL;
}

Router.map(function() {
  this.route('about');
  this.route('cart');
  this.route('checkout');
  this.route('login');
  this.route('register');
  this.route('account');
  this.route('library', { path: '/library' }, function() {
      this.route('library-items', { path: '/:category_id' });
  });

  this.route('admin', function() {
      this.route('return', { path: '/return' }, function () {
          this.route('return-order', { path: '/:checkout_id' });
      });
      this.route('fulfill', { path: '/fulfill' }, function () {
          this.route('fulfill-order', { path: '/:checkout_id' });
      });
      this.route('manage', { path: '/manage' }, function () {
          this.route('manage-order', { path: '/:checkout_id' });
      });
      this.route('add');
      this.route('remove');
  });
  this.route('404', { path: '/*path' });
});
