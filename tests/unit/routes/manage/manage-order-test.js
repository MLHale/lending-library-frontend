import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | manage/manage-order', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:manage/manage-order');
    assert.ok(route);
  });
});
