/**
 * @Author: Matthew Hale <matthale>
 * @Date:   2018-03-01T22:58:28-06:00
 * @Email:  mlhale@unomaha.edu
 * @Filename: source.js
 * @Last modified by:   matthale
 * @Last modified time: 2018-03-01T22:58:43-06:00
 * @Copyright: Copyright (C) 2018 Matthew L. Hale
 */



import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  awards: DS.hasMany('award'),
});
