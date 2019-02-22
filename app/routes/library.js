import { A } from '@ember/array';
import Route from '@ember/routing/route';
import $ from 'jquery';
import { later } from '@ember/runloop';

export default Route.extend({
  getData(){
    var items = A([]);
    return $.get('/api/items').then(function(events){
      console.log(events);
      events.data.forEach(function(event){
        console.log("----------------------------");
        console.log(event.attributes.description);
        console.log(event.attributes.partname);

        items.addObject({
          partname: event.attributes.partname,
          description: event.attributes.description
        });
      });
      return items.reverse();
      // events.forEach(function(event){
      //   // console.log(event);
      //   items.addObject({
      //     id: event.pk,
      //     eventtype: event.fields.eventtype,
      //     requestor: event.fields.requestor,
      //     timestamp: event.fields.timestamp,
      //     userid: event.fields.userid,
      //     img: 'img/event-icon.jpg',
      //     link: 'index'
      //   });
      // });
      // return items.reverse()
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
    this.set('items', this.getData());
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
