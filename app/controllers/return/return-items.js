import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        finish(checkout) {
            checkout.set('returnedon', new Date().toISOString());
            checkout.save();
        }
    }
});
