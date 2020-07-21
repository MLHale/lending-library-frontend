import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: "section",
  // The page we are currently on
  page: 1,
  // The number of items to show per page
  paginateBy: 10,
  // Returns the list of items for the current page only
  paginatedItems: computed('items', 'page', function(){
    var i = (parseInt(this.page) - 1) * parseInt(this.paginateBy);
    var j = i + parseInt(this.paginateBy);
    return this.items.slice(i, j);
  }),
  // The total number of pages that our items span
  numberOfPages: computed('page', function(){
    var n = this.get('items.length');
    var c = parseInt(this.paginateBy);
    var r = Math.floor(n/c);
    if(n % c > 0) {
      r += 1;
    }
    return r;
  }),
  // An array containing the number of each page: [1, 2, 3, 4, 5, ...]
  pageNumbers: computed('numberOfPages', function(){
    var n = Array(this.numberOfPages);
    for(var i = 0;i < n.length;i++) {
      n[i] = i + 1;
    }
    return n;
  }),
  // Whether or not to show the "next" button
  showNext: computed('page', function(){
    return this.page < this.numberOfPages;
  }),
  // Whether or not to show the "previous" button
  showPrevious: computed('page', function(){
    return this.page > 1;
  }),
  actions: {
    // Show the next page of items
    nextClicked() {
      if(this.page + 1 <= this.numberOfPages) {
        this.set('page', this.page + 1);
      }
    },
    // Show the previous page of items
    previousClicked() {
      if(this.page > 0) {
        this.set('page', this.page - 1);
      }
    },
    // Go to the clicked page of items
    pageClicked(pageNumber){
      this.set('page', pageNumber);
    }
  }
});