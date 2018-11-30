/**
 * @Author: Matthew Hale <matthale>
 * @Date:   2018-02-28T00:25:25-06:00
 * @Email:  mlhale@unomaha.edu
 * @Filename: award.js
 * @Last modified by:   matthale
 * @Last modified time: 2018-03-02T01:52:02-06:00
 * @Copyright: Copyright (C) 2018 Matthew L. Hale
 */



import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  awardlink: DS.attr('string'),
  sponsororg: DS.attr('string'),
  recurring: DS.attr('string'),
  nomreq: DS.attr('boolean'),
  opendate: DS.attr('date', { defaultValue() { return new Date(); } }),
  nomdeadline: DS.attr('date'),
  submdeadline: DS.attr('date'),
  previousapplicants: DS.attr('number'),
  createdon: DS.attr('date'),

  // Related fields
  source: DS.belongsTo('source'),
  createdby: DS.belongsTo('user'),
  applicanttypes: DS.hasMany('applicanttype'),
  awardpurposes: DS.hasMany('awardpurpose'),
  stemfields: DS.hasMany('stemfield')
});
