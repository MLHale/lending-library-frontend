import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    /**
      Pass login action onward to auth service
    **/
    login(){
      this.get('auth').login();
    }
  }
});
