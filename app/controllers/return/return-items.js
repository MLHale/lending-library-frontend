import Controller from '@ember/controller';

export default Controller.extend({
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
