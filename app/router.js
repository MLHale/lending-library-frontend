import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('tasks',{path:'/static/ember/tasks'});
  this.route('about');
  this.route('library',{path:'/library'});
  this.route('projects');
  this.route('cart');
  this.route('checkout');
  this.route('login');
});

export default Router;
