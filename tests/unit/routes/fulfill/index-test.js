import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | fulfill/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:fulfill/index');
    assert.ok(route);
  });
});
