import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | library/library-items', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:library/library-items');
    assert.ok(route);
  });
});
