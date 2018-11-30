/**
 * @Author: Matthew Hale <matthale>
 * @Date:   2018-02-28T11:38:20-06:00
 * @Email:  mlhale@unomaha.edu
 * @Filename: areaofinterest.js
 * @Last modified by:   matthale
 * @Last modified time: 2018-02-28T12:02:45-06:00
 * @Copyright: Copyright (C) 2018 Matthew L. Hale
 */



import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  awards: DS.hasMany('award'),
});
