import Service from '@ember/service';
import bool from '@ember/object/computed';
import $ from 'jquery';

export default Service.extend({
  accessToken: null,

  authenticate(login, password) {
    return $.ajax({
      method: "POST",
      url: "/token",
      data: { username: login, password: password }
    }).then((result) => {
      this.set('accessToken', result.access_token);
    });
  },

  invalidate() {
    this.set('accessToken', null);
  },

  isAuthenticated: bool('accessToken')

});
