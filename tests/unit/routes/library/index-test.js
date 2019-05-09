import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | library/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:library/index');
    assert.ok(route);
  });
});
