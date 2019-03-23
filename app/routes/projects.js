import { A } from '@ember/array';
import Route from '@ember/routing/route';
import $ from 'jquery';
import { later } from '@ember/runloop';


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

export default Route.extend({
  getData(){
    var items = A([]);
    return $.get('/api/projects').then(function(events){
      console.log(events);
      (function(event){
        console.log(event);
        items.addObject({
          id: event.pk,
          eventtype: event.fields.eventtype,
          requestor: event.fields.requestor,
          timestamp: event.fields.timestamp,
          userid: event.fields.userid,
          img: 'img/event-icon.jpg',
          link: 'index'
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
});
