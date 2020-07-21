import Model, { belongsTo, attr, hasMany } from '@ember-data/model';
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
	  org: {
		description: 'Organization',
		validators: [
		  validator('presence', true),
		]
	  },
    },
    {
      debounce: 500
    }
);

export default Model.extend(Validations, {
    user:belongsTo('user'),
    address:attr('string'),
    phonenumber:attr('string'),
    org:attr('string'),
    checkouts:hasMany('checkout'),
});
