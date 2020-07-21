import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import fade from 'ember-animated/transitions/fade';
import { toUp, toDown } from 'ember-animated/transitions/move-over';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default Controller.extend({
	auth: service('auth-manager'),
	store: service('store'),

	currentStep: 1,
	transition: fade,
	showError: false,
	errorMsg: '',
	showSuccess: false,
	successMsg: '',

	addingNewCategory: false,

	// For adding a new category
	newCategoryName: '',
	newCategoryDescription: '',
	newCategoryImage: '',

	// For an existing category
	selectedCategory: null,

	addingNewItem: false,

	// For adding a new itemtype
	newItemName: '',
	newItemDescription: '',
	newItemQuantity: 0,

	// For changing quantity
	selectedItemtype: '',

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
	
	async addNewItems(category) {
		let controller = this;
		let quantity = parseInt(controller.newItemQuantity);
		let user = await controller.auth.get('user');

		// First, create the new itemtype for the individual items
		let newItemType = controller.store.createRecord('itemtype', {
			category: category,
			partname: controller.newItemName,
			description: controller.newItemDescription,
		});

		newItemType.save().then((itemtype) => {
			for(let i = 0; i < quantity; i++) {
				// Now, create the individual items
				let newItem = controller.store.createRecord('item', {
					owner: user,
					itemtype: itemtype
				});

				newItem.save();
			}

			this.set('successMsg', (quantity + ' ' + itemtype.get('partname') + ((quantity > 1) ? '\'s have' : ' has') + ' been added to the library.'));
			this.toggleProperty('showSuccess');
			setTimeout(() => {
				this.toggleProperty('showSuccess');
				this.set('successMsg', '');
				this.transitionToRoute('admin.index');
			}, 5000);
		});

	},
	async addExistingItems(itemtype, quantity) {
		let controller = this;
		let user = await controller.auth.get('user');

		for (let i = 0; i < quantity; i++) {
			// Create the individual items
			let newItem = controller.store.createRecord('item', {
				owner: user,
				itemtype: itemtype
			});

			newItem.save();
		}

		this.set('successMsg', (quantity + ' ' + itemtype.get('partname') + ((quantity > 1) ? '\'s have' : ' has') + ' been added to the library.'));
		this.toggleProperty('showSuccess');
		setTimeout(() => {
			this.toggleProperty('showSuccess');
			this.set('successMsg', '');
			this.transitionToRoute('admin.index');
		}, 5000);
	},
	actions: {
		incrementStep() {
			if (this.currentStep == 2){
				if (this.addingNewCategory){
					// Validate the form isn't empty
					if (this.newCategoryName != '' && this.newCategoryDescription != '' && this.newCategoryImage != '') { 
						this.set('addingNewItem', true);
						this.incrementProperty('currentStep', 2);
					} else {
						this.set('errorMsg', 'Please fill in all the fields.');
						this.toggleProperty('showError');
						setTimeout(() => {
							this.toggleProperty('showError');
							this.set('errorMsg', '');
						}, 5000);
					}

				} else {
					// Validate they selected a category
					if(this.selectedCategory) {
						this.incrementProperty('currentStep');
					} else {
						this.set('errorMsg', 'Please select a category before proceeding.');
						this.toggleProperty('showError');
						setTimeout(() => {
							this.toggleProperty('showError');
							this.set('errorMsg', '');
						}, 5000);
					}
				}
			} else {
				this.incrementProperty('currentStep');
			}
			
		},
		decrementStep() {
			if (this.currentStep == 2) {
				this.set('addingNewCategory', false);
			}
			if (this.currentStep == 4) {
				this.set('addingNewItem', false);
				this.set('newItemQuantity', 0);
				if(this.addingNewCategory) {
					this.decrementProperty('currentStep');
				}
			}
			this.decrementProperty('currentStep');
		},
		incrementQuantity() {
			this.incrementProperty('newItemQuantity');
		},
		decrementQuantity(){
			this.decrementProperty('newItemQuantity');
		},
		setAddingNewCategory() {
			this.set('addingNewCategory', true);
			this.incrementProperty('currentStep');
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
		setAddingNewItem() {
			this.set('addingNewItem', true);
			this.incrementProperty('currentStep');
		},
		selectItemtype(itemtype) {
			if(this.selectedItemtype) {
				document.getElementById(this.selectedItemtype.id).classList.remove('active');
			}
			this.set('selectedItemtype', itemtype);
			document.getElementById(itemtype.id).classList.add('active');
		},
		uploadFile(event) {
			let controller = this;
			const reader = new FileReader();
			const file = event.target.files[0];
			let imageData;

			reader.onload = function () {
				imageData = reader.result;
				controller.set('newCategoryImage', imageData);
			};

			if (file) {
				reader.readAsDataURL(file);
			}
		},
		submitNew() {
			// Validate the form isn't empty
			if (this.newItemName != '' && this.newItemDescription != '' && this.newItemQuantity > 0) {
				let controller = this;

				if (controller.addingNewCategory){
					// let image = controller.newCategoryImage;
					// let newImage = path.replace(/^.*\\/, "");
					
					let newCategory = controller.store.createRecord('category', {
						categoryname: controller.newCategoryName,
						description: controller.newCategoryDescription,
						image: controller.newCategoryImage
					});

					newCategory.save().then((category) => {
						controller.addNewItems(category);
					});

				} else {
					controller.store.findRecord('category', this.selectedCategory).then((category) => {
						controller.addNewItems(category);
					});
				}
			} else {
				this.set('errorMsg', 'Please fill in all the fields.');
				this.toggleProperty('showError');
				setTimeout(() => {
					this.toggleProperty('showError');
					this.set('errorMsg', '');
				}, 5000);
			}
		},
		submitExisting(){
			// Validate the form isn't empty
			if (this.newItemQuantity > 0 && this.selectedItemtype != '') {
				let controller = this;

				if (controller.addingNewCategory) {

					let newCategory = controller.store.createRecord('category', {
						categoryname: controller.newCategoryName,
						description: controller.newCategoryDescription,
						image: controller.newCategoryImage
					});

					newCategory.save().then((category) => {
						controller.addNewItems(category);
					});

				} else {
					controller.store.findRecord('category', this.selectedCategory).then((category) => {
						if (controller.addingNewItem) {
							controller.addNewItems(category);
						} else {
							controller.addExistingItems(this.selectedItemtype, this.newItemQuantity);
						}
					});

				}
			} else {
                if (this.newItemQuantity <= 0) {
					this.set('errorMsg', 'Please enter a valid number of items to add.')
                } else {
					this.set('errorMsg', 'Please fill in all the fields.');
                }
				this.toggleProperty('showError');
				setTimeout(() => {
					this.toggleProperty('showError');
					this.set('errorMsg', '');
				}, 5000);
			}
		}
		
	}
	
});
