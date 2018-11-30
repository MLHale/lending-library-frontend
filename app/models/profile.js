/**
 * @Author: Matthew Hale <matthale>
 * @Date:   2018-02-28T10:52:40-06:00
 * @Email:  mlhale@unomaha.edu
 * @Filename: profile.js
 * @Last modified by:   matthale
 * @Last modified time: 2018-03-02T01:52:09-06:00
 * @Copyright: Copyright (C) 2018 Matthew L. Hale
 */



import DS from 'ember-data';

export default DS.Model.extend({
  org : DS.attr('string'),
  college: DS.attr('string'),
  dept: DS.attr('string'),
  otherdetails: DS.attr('string'),

  // Related fields
  user: DS.belongsTo('user'),
  areasofinterest: DS.hasMany('areaofinterest')
});
