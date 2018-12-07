import Controller from '@ember/controller';
import $ from 'jquery';

export default Controller.extend({
  actions: {
    /**
      Open external links dispatched from the nav menu
    **/
    externalLink(item){
      window.open(item.route);
    },

    /**
      Set of functions related to opening and closing menu options
    **/
    openDialog(event) {
      this.set('dialogOrigin', $(event.currentTarget));
      this.set('showDialog', true);
    },
    closeDialog(result) {
      this.set('result', result);
      this.set('showDialog', false);
    },

    /**
      Pass logout action onward to auth service
    **/
    logout(){
      this.get('auth').logout();
    }
  }
});
