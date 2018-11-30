/**
 * @Author: Matthew Hale <matthale>
 * @Date:   2018-02-28T10:54:54-06:00
 * @Email:  mlhale@unomaha.edu
 * @Filename: user.js
 * @Last modified by:   matthale
 * @Last modified time: 2018-03-02T03:32:29-06:00
 * @Copyright: Copyright (C) 2018 Matthew L. Hale
 */



import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr('string'),
	email: DS.attr('string'),
	firstname: DS.attr('string'),
  lastname: DS.attr('string'),
  issuperuser: DS.attr('boolean'),
});
