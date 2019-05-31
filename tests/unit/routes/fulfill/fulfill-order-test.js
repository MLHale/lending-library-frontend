import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | fulfill/fulfill-order', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:fulfill/fulfill-order');
    assert.ok(route);
  });
});
