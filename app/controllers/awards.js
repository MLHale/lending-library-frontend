/**
 * @Author: Matthew Hale <matthale>
 * @Date:   2018-03-01T02:38:10-06:00
 * @Email:  mlhale@unomaha.edu
 * @Filename: awards.js
 * @Last modified by:   matthale
 * @Last modified time: 2018-03-02T01:56:34-06:00
 * @Copyright: Copyright (C) 2018 Matthew L. Hale
 */



import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
  /**
    Filters are bound to search interface fields
  **/
  filters: Ember.ObjectProxy.create({content: Ember.Object.create({
    title: null,
    stemfields: Ember.ArrayProxy.create({content: Ember.A([])}),
    applicanttypes: Ember.ArrayProxy.create({content: Ember.A([])}),
    description: null,
    awardlink: '',
    sponsor: null,
    sources: Ember.ArrayProxy.create({content: Ember.A([])}),
    purposes: Ember.ArrayProxy.create({content: Ember.A([])}),
  })}),

  /**
    FilteredAwards are displayed in the search interface. The field is binding-aware, meaning it updates anytime the attached filter field is updated.
    The output of filteredAwards is the set of awards that match all criteria. Regex is used where appropriate for partial matching.
  **/
  filteredAwards: Ember.computed(
    'model.awards.@each',

    'filters.title',
    'filters.sponsororg',
    'filters.description',
    'filters.awardlink',
    'filters.stemfields.@each',
    'filters.sources.@each',
    'filters.purposes.@each',
    'filters.applicanttypes.@each',
  function(){
    var filters = this.get('filters');
    var awards = this.get('model.awards');

    // filter by award title
    if(filters.get('title')){
      var regex = new RegExp(filters.get('title'), "i");
      awards = awards.filter((award)=>{
        return regex.test(award.get('title'));
      });
    }

    // filter by sponsoring organization
    if(filters.get('sponsororg')){
      var regex = new RegExp(filters.get('sponsororg'), "i");
      awards = awards.filter((award)=>{
        return regex.test(award.get('sponsororg'));
      });
    }

    // filter by award link
    if(filters.get('awardlink')){
      var regex = new RegExp(filters.get('awardlink'), "i");
      awards = awards.filter((award)=>{
        return regex.test(award.get('awardlink'));
      });
    }

    // filter by award description
    if(filters.get('description')){
      var regex = new RegExp(filters.get('description'), "i");
      awards = awards.filter((award)=>{
        return regex.test(award.get('description'));
      });
    }

    // filter by applicanttypes
    var applicanttypeFilters = filters.get('applicanttypes');
    if(applicanttypeFilters.get('length')>0){
      var applicanttypeset = Ember.A([]);
      applicanttypeFilters.forEach((applicanttype)=>{
        // all awards that have a purpose that matches the current one
        applicanttypeset.addObjects(awards.filter((award)=>{
          return award.get('applicanttypes').includes(applicanttype);
        },this));
      });
      // ensure awards are not duplicated if they match multiple criteria
      awards = applicanttypeset.uniq();
    }

    // filter by stem field
    var stemfieldFilters = filters.get('stemfields');
    if(stemfieldFilters.get('length')>0){
      var stemset = Ember.A([]);
      stemfieldFilters.forEach((stemfield)=>{
        // all awards that have a stem field that matches the current one
        stemset.addObjects(awards.filter((award)=>{
          return award.get('stemfields').includes(stemfield);
        },this));
      });
      // ensure awards are not duplicated if they match multiple criteria
      awards = stemset.uniq();
    }

    // filter by source
    var sourceFilters = filters.get('sources');
    if(sourceFilters.get('length')>0){
      var sourceset = Ember.A([]);
      sourceFilters.forEach((source)=>{
        // all awards that have a source that matches the current one
        sourceset.addObjects(awards.filter((award)=>{
          return award.get('source.name') === source.get('name');
        },this));
      });
      // ensure awards are not duplicated if they match multiple criteria
      awards = sourceset.uniq();
    }

    // filter by purpose
    var purposeFilters = filters.get('purposes');
    if(purposeFilters.get('length')>0){
      var purposeset = Ember.A([]);
      purposeFilters.forEach((purpose)=>{
        // all awards that have a purpose that matches the current one
        purposeset.addObjects(awards.filter((award)=>{
          return award.get('awardpurposes').includes(purpose);
        },this));
      });
      // ensure awards are not duplicated if they match multiple criteria
      awards = purposeset.uniq();
    }

    return awards;
  }),

  actions: {
    /**
      Set of functions related to opening and closing modals that display additional award details
    **/
    openDialog(item, event) {
      this.set('dialogOrigin', $(event.currentTarget));
      this.set('selectedAward', item);
      this.set('showDialog', true);
    },
    closeDialog(result) {
      this.set('result', result);
      this.set('showDialog', false);
    },

    /**
      Not currently in use. Filters update automatically without the need to "submit"
    **/
    search(){

    },
  }
});
