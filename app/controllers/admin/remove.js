import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import fade from 'ember-animated/transitions/fade';
import { toUp, toDown } from 'ember-animated/transitions/move-over';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { A } from '@ember/array';

export default Controller.extend({
	auth: service('auth-manager'),
	store: service('store'),

	currentStep: 1,
	transition: fade,
	showError: false,
	errorMsg: '',
	showSuccess: false,
	successMsg: '',

	selectedCategory: null,
	selectedItemtype: '',
	removalQuantity: 0,

	// Changing quantity animation
	rules({ oldItems, newItems }) {
		if (oldItems[0] > newItems[0]) {
			return toUp;
		} else {
			return toDown;
		}
	},

	itemtypesByCategory: computed('model.itemtypes', 'selectedCategory', function () {
		let itemtypes = this.model.itemtypes;
		let selectedCategory = this.selectedCategory;

		if (isEmpty(selectedCategory)) {
			return itemtypes;
		}

		return itemtypes.filter(function (itemtype) {
			return itemtype.get('category.id').match(selectedCategory);
		})

	}),

	async asyncForEach(array, callback) {
		for (let index = 0; index < array.length; index++) {
			await callback(array.objectAt(index), index, array);
		}
	},

	actions: {
		incrementStep() {
			this.incrementProperty('currentStep');
		},
		decrementStep() {
			this.set('removalQuantity', 0);
			this.decrementProperty('currentStep');
		},
		incrementQuantity() {
			this.incrementProperty('removalQuantity');
		},
		decrementQuantity() {
			this.decrementProperty('removalQuantity');
		},
		selectCategory(category) {

			if (this.selectedCategory) {
				let previouslySelected = this.selectedCategory;
				let card = document.getElementById(previouslySelected);
				let checkmark = document.getElementById(('checkmark-' + previouslySelected));
				let circle = document.getElementById(('circle-' + previouslySelected));
				let check = document.getElementById(('check-' + previouslySelected));

				checkmark.classList.remove("checkmark-category");
				circle.classList.remove("checkmark__circle-category");
				check.classList.remove("checkmark__check-category");

				card.style.opacity = "0";
				card.style.zIndex = "-2";
			}

			this.set('selectedCategory', category.get('id'));

			let card = document.getElementById(category.get('id'));
			let checkmark = document.getElementById(('checkmark-' + category.get('id')));
			let circle = document.getElementById(('circle-' + category.get('id')));
			let check = document.getElementById(('check-' + category.get('id')));

			card.style.opacity = "1";
			card.style.zIndex = "2";

			checkmark.classList.add("checkmark-category");
			circle.classList.add("checkmark__circle-category");
			check.classList.add("checkmark__check-category");

			setTimeout(() => { this.incrementProperty('currentStep'); }, 1500);

		},

		selectItemtype(itemtype) {
			if (this.selectedItemtype) {
				document.getElementById(this.selectedItemtype.id).classList.remove('active');
			}
			this.set('selectedItemtype', itemtype);
			document.getElementById(itemtype.id).classList.add('active');
		},
		
		async submit() {
			let controller = this;
			if (this.selectedItemtype && this.selectedCategory && this.removalQuantity > 0) {
				let category = this.store.peekRecord('category', this.selectedCategory);
				let itemtype = this.selectedItemtype;

				let availableItems = A([]);
				let totalItems = 0;
				await controller.store.query('item', { 'itemtype': itemtype.get('id') }).then(async (items) => {
					await this.asyncForEach(items, async (item) => {
						let checkedouttoid = await item.get('checkedoutto.id');
						if (checkedouttoid == null) {
							availableItems.pushObject(item);
						}
						totalItems++;
					});
				});

				if(availableItems.length >= this.removalQuantity) {
					for (let i = 0; i < this.removalQuantity; i++) {
						availableItems[i].destroyRecord();
					}

					if (this.removalQuantity == totalItems) {
						// We need to remove the itemtype too
						itemtype.destroyRecord().then(() => {
							// Now check if we need to remove the category too
							this.store.query('itemtype', { 'category': category.get('id') }).then((itemtypes) => {
								if (itemtypes.length == 0) {
									category.destroyRecord();
								}
							});
						});
					}

					// Show success message 
					controller.set('successMsg', (((this.removalQuantity == totalItems) ? 'All of the ' : (this.removalQuantity)) + ' ' + itemtype.get('partname') + ((this.removalQuantity > 1 || this.removalQuantity == totalItems) ? '\'s have ' : ' has') + ' been removed from the inventory.'));
					controller.toggleProperty('showSuccess');
					setTimeout(() => {
						controller.toggleProperty('showSuccess');
						controller.set('successMsg', '');
					}, 5000);
				} else {
					// Show the error message
					controller.set('errorMsg', ('Can\'t remove ' + this.removalQuantity + ' ' + itemtype.get('partname') + '\'s from the inventory. ' + ((availableItems.length > 0) ? ('There ' + ((availableItems.length > 1) ? 'are' : 'is') + ' only ' + availableItems.length + ' available.') : ('All the ' + itemtype.get('partname') + '\'s are checked out.'))));
					controller.toggleProperty('showError');
					setTimeout(() => {
						controller.toggleProperty('showError');
						controller.set('errorMsg', '');
					}, 5000);
				}
			} else {
				// Show the error message
				controller.set('errorMsg', 'Please select what item you would like to remove, and how many.');
				controller.toggleProperty('showError');
				setTimeout(() => {
					controller.toggleProperty('showError');
					controller.set('errorMsg', '');
				}, 5000);
			}
		}

	}

});
