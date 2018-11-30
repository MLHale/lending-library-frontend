/**
 * @Author: Matthew Hale <matthale>
 * @Date:   2018-02-28T02:11:26-06:00
 * @Email:  mlhale@unomaha.edu
 * @Filename: register.js
 * @Last modified by:   matthale
 * @Last modified time: 2018-03-02T04:00:51-06:00
 * @Copyright: Copyright (C) 2018 Matthew L. Hale
 */



import Controller from '@ember/controller';
import config from '../config/environment';

export default Controller.extend({
  emailValidation: [{
    message: 'Please provide email in a valid format',
    validate: (inputValue) => {
      let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(inputValue);
    }
  }],
  passwordValidation: [{
    message: 'Password is too short',
    validate: (inputValue) => {
      let valid = false;
      if(inputValue){
        valid = inputValue.length>=8;
      }
      return valid;
    }
  }],
  passwordsValid: Ember.computed('model.password','confirmpassword',function(){
    return ((this.get('model.password')===this.get('confirmpassword')) && (this.get('model.password')!=null));
  }),
  emailsValid: Ember.computed('model.email','confirmemail',function(){
    return ((this.get('model.email')===this.get('confirmemail'))&&(this.get('model.email')!=null));
  }),
  invalidForm: Ember.computed('passwordsValid','emailsValid','model.username',function(){
    return !(this.get('emailsValid') && this.get('passwordsValid') && (this.get('model.username')!=null));
  }),
  actions: {
    register: function(){
      this.set('validationErrorMsg', '');
      var user = this.get('model');
      var controller = this;

      var requestdata = {
        'username': user.get("username"),
        'password': user.get('password'),
        'email': user.get('email'),
      };
      Ember.$.post(config.serverName+'/api/register/', requestdata, function(response){
        var errMsg = '';
        if(response.data.status ==="error"){
          if(response.data.username){
            errMsg = response.data.username;
          }
          else if(response.data.email){
            errMsg = response.data.email;
          }
          else {
            errMsg = "An unknown error occured. Please try again";
          }
          controller.set('validationErrorMsg', errMsg);
          controller.get('notifications').warning(`${controller.get('validationErrorMsg')}`, {
  					clearDuration: 3000,
  					autoClear: true
  				});
        }
        else{
          //success
          controller.set('success', true);
          controller.get('auth').set('username',user.get('username'))
          controller.get('auth').set('password',user.get('password'))
          controller.get('notifications').success(`Successful registration.`, {
  					clearDuration: 3000,
  					autoClear: true
  				});
          controller.transitionToRoute('login');
        }


      });
    }
  }
});
