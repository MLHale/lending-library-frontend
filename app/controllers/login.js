/**
 * @Author: Matthew Hale <matthale>
 * @Date:   2018-03-01T16:19:15-06:00
 * @Email:  mlhale@unomaha.edu
 * @Filename: login.js
 * @Last modified by:   matthale
 * @Last modified time: 2018-03-02T01:56:24-06:00
 * @Copyright: Copyright (C) 2018 Matthew L. Hale
 */



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
