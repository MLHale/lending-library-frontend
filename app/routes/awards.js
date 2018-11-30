/**
 * @Author: Matthew Hale <matthale>
 * @Date:   2018-02-28T02:12:57-06:00
 * @Email:  mlhale@unomaha.edu
 * @Filename: awards.js
 * @Last modified by:   matthale
 * @Last modified time: 2018-03-02T01:52:31-06:00
 * @Copyright: Copyright (C) 2018 Matthew L. Hale
 */



import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  /**
    Load awards for display and other fields for filtering interface
  **/
  model(){
    return RSVP.hash({
      awards: this.store.findAll('award', {include: 'applicanttypes,awardpurposes,stemfields,createdby,createdby.areasofinterest,createdby.user,source'}),
      stemfields: this.store.findAll('stemfield'),
      applicanttypes: this.store.findAll('applicanttype'),
      sources: this.store.findAll('source'),
      purposes: this.store.findAll('awardpurpose'),
    })
  }
});
