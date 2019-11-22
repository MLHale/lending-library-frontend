import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations(
    {
      address: {
        description: 'Address',
        validators: [
          validator('presence', true),
        ]
      },
      phonenumber: [
        validator('format', {
          allowBlank: false,
          type: 'phone'
        })
      ],
    },
    {
      debounce: 500
    }
);

export default DS.Model.extend({
    user:DS.belongsTo('user'),
    address:DS.attr('string'),
    phonenumber:DS.attr('string'),

    org:DS.attr(),
    college:DS.attr(),
    dept:DS.attr(),
    otherdetails:DS.attr(),

    checkouts:DS.hasMany('checkout'),
});
