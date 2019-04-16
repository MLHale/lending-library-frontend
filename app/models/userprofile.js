import DS from 'ember-data';

export default DS.Model.extend({
  /* The serializer has fields from both user and userprofile in backend. */
  /* This will probably need split into two models. */
  username: DS.attr(),
  first_name: DS.attr(),
  last_name: DS.attr(),
  email: DS.attr(),
  password: DS.attr(), /* Should password be handled in JSON? */
  user_permissions: DS.attr(),
  is_superuser: DS.attr(),
  is_active: DS.attr(),
  last_login: DS.attr(),
  date_joined: DS.attr(),
  org: DS.belongsTo('organization'),
  roles: DS.attr(),
});
