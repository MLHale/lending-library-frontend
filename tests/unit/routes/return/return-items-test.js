import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | return/return-items', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:return/return-items');
    assert.ok(route);
  });
});
