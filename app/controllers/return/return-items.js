import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    auth: service('auth-manager'),
    init: function() {
        this._super(...arguments)

        // TODO: Check for admin privelages here
        if(!(this.get('auth').get('isLoggedIn'))){
            this.transitionToRoute('login');
        }
    },

    actions: {
        finish(checkout) {
            checkout.set('returnedon', new Date());
            
            console.log("-----------------------------------")
            console.log("Items in cart:")
            checkout.items.forEach(item => {
                console.log("  - " + item.get("itemtype").get("partname"));
            });
            console.log("-----------------------------------")
            console.log("Items returned:")
            checkout.items.forEach(item => {
                console.log(this.get("select-" + item.get("itemtype").get("id")));
                console.log("  - " + this.get( (item.get("itemtype").get("id") + '.value')) + " " + item.get("itemtype").get("partname"));
            });
            
            // var role = this.get( (item.get("itemtype").get("id") + '.value'));
            // console.log(role); 

            // select-{{item.itemtype.id}}

            checkout.set('missingparts', "Any missing parts should be filled in.");

            console.log("-----------------------------------")

            checkout.save();
        }
    }
});
