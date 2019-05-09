import Route from '@ember/routing/route';
import { later } from '@ember/runloop';

export default Route.extend({ 
  getData(){
    return this.store.findAll('category').reverseObjects();
  },
	model() {
    return this.getData();
	},
  setupController(controller, model){
    this._super(controller, model);
    this.set('categories', this.getData());
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
