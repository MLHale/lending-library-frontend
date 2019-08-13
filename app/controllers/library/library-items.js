import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default Controller.extend({
    cart: service('shopping-cart'),
    queryParams: ['search'], 
    search: '',
    errorMsg: '',
    // filteredItemTypes: computed('filter', function() {
    //     const filterTerm = this.get('filter');
    //     var model = this.get('model.itemtypes');

    //     // var filtered = model.filterBy('partname', filterTerm);
    //     var filtered = model.filter( function(itemType) {
    //         console.log(itemType);
    //         return itemType.get('partname').indexOf(filterTerm) !== -1;
    //     });

    //     return filtered;
    // }),
    filtered: computed('search', 'model.itemtypes', function() { 
        const itemtypes = this.get('model.itemtypes'); 
        const search = this.get('search').toLowerCase(); 
    
        if (isEmpty(search)) { 
            return itemtypes; 
        } 
    
        return itemtypes.filter(function(itemtype) { 
            return itemtype.get('partname').toLowerCase().match(search);
        }) 
    }), 

    actions: {
        add(itemtype) { 
            console.log("Quantity of " + itemtype.get("partname") + "'s: " + this.cart.getQuantity(itemtype))
            if(this.cart.getQuantity(itemtype) < itemtype.items.length) {
                this.cart.add(itemtype);
                $("#success-alert")
                .fadeTo(5000, 500)
                .slideDown(500, function() {
                    $("#success-alert").slideUp(500);
                });
            } else {
                console.log("You cannot add more items to your cart then there are available.")
                this.set('errorMsg', 'You already have all the available ' + itemtype.partname + "'s in your cart.");
                $("#danger-alert")
                .fadeTo(5000, 500)
                .slideDown(500, function() {
                    $("#danger-alert").slideUp(500);
                });
            }
            
        },

        hideSuccess() {
            $("#success-alert").hide();
        },

        hideDanger() {
            $("#danger-alert").hide();
        }
    }
});