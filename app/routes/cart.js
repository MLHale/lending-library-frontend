import Route from '@ember/routing/route';

/*
import { A } from '@ember/array';
import $ from 'jquery';
import { later } from '@ember/runloop';
*/

/*
var defaultitems = A([
  {
    title: 'Lending Library',
    description: 'Exciting stuff!',
    img: 'img/NGC-logo.png',
    link: '',
    link_external: 'http://mlhale.github.io/lending-library'

  },
	{
		title: 'Masonry-based Event Display Template',
		description: 'You are seeing this template, because you haven\'t loaded any data into your client yet. This Template will be used to display events as they load from your REST API.',
    img: 'img/template-icon.svg',
    link: 'index'

	},


]);
*/

export default Route.extend({
  model() {
    // bug - when page is refreshed auth.isLoggedIn is logged as false
    // when the user is logged in and the property is still set to true
    if (this.get('auth.isLoggedIn'))
    {
      console.log("Retrieve the user's cart");
    }
    else{
      console.log('User not logged in, no cart to display');
    }
	}

  /*
  getData(){
    var items = A([]);
    return $.get('/api/itemType').then(function(events){
      (function(event){
        //console.log(events);
        items.addObject({
          name: event.fields.name,
          description: event.fields.description,
          imagepath: 'static/ember/assets/rpi2b',
        });
      });
      return items.reverse()
    }, function(msg){//error
      console.log('Error loading events:');
      console.log(msg.statusText);
    });
  },
	model() {
    return this.getData();
	},
  setupController(controller, model){
    this._super(controller, model);
    controller.set('defaultitems', defaultitems);
    var route = this;
    setInterval(later(route, function() {
      // code here will execute within a RunLoop about every minute
      if(controller.get('auth.isLoggedIn')){
        route.getData().then(function(data){
          if(data[0].id!=controller.get('content')[0].id){
            controller.get('content').insertAt(0, data[0]);
          }
        });
      }
    }, 5), 3000);
  }
  */
});
