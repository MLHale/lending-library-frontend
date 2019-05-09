import Route from '@ember/routing/route';
import { later } from '@ember/runloop';

export default Route.extend({
  getData(){
    // var items = A([]);
    // return $.get('/api').then(function(events){
    //   events.forEach(function(event){
    //     // console.log(event);
    //     items.addObject({
    //       id: event.pk,
    //       eventtype: event.fields.eventtype,
    //       requestor: event.fields.requestor,
    //       timestamp: event.fields.timestamp,
    //       userid: event.fields.userid,
    //       img: 'img/event-icon.jpg',
    //       link: 'index'
    //     });
    //   });
    //   return items.reverse()
    // }, function(msg){//error
    //   console.log('Error loading events:');
    //   console.log(msg.statusText);
    // });
    return this.store.findAll('checkout').reverseObjects();
  },
	model() {
    return this.getData();
	},
  setupController(controller, model){
    this._super(controller, model);
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