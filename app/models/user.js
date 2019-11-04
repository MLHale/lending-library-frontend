import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations(
    {
      username: {
        description: 'Username',
        validators: [
          validator('presence', true),
          validator('length', {
            min: 5,
            max: 32
          })
        ]
      },
      firstname: validator('presence', true),
      lastname: validator('presence', true),
      password: {
        description: 'Password',
        validators: [
          validator('presence', true),
          validator('length', {
            min: 5,
          })
        ]
      },
      passwordConfirmation: validator('confirmation', {
        on: 'password',
        message: 'Passwords do not match'
      }),
      email: {
        validators: [
          validator('presence', true),
          validator('format', {
            type: 'email'
          })
        ]
      }
    },
    {
      debounce: 500
    }
);

export default DS.Model.extend(Validations, {
    username: DS.attr('string'),
    firstname: DS.attr('string'),
    lastname: DS.attr('string'),
    email: DS.attr('string'),
    profile:DS.belongsTo('profile'),

});
