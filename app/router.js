/**
 * @Author: Matthew Hale <matthale>
 * @Date:   2018-02-28T02:12:57-06:00
 * @Email:  mlhale@unomaha.edu
 * @Filename: router.js
 * @Last modified by:   matthale
 * @Last modified time: 2018-03-02T01:48:18-06:00
 * @Copyright: Copyright (C) 2018 Matthew L. Hale
 */



import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.bURL
});

Router.map(function() {
  this.route('register');
  this.route('login');
  this.route('awards');
  this.route('profile');
});

export default Router;
