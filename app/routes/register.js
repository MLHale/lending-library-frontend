/**
 * @Author: Matthew Hale <matthale>
 * @Date:   2018-02-28T00:25:25-06:00
 * @Email:  mlhale@unomaha.edu
 * @Filename: register.js
 * @Last modified by:   matthale
 * @Last modified time: 2018-03-02T02:32:28-06:00
 * @Copyright: Copyright (C) 2018 Matthew L. Hale
 */



import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model(){
		return this.store.createRecord('user')
  }
});
