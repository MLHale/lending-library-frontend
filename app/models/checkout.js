import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations(
    {
        firstname: {
            description: 'First name',
            validators: [validator('presence', true),]
        },
        lastname: {
            description: 'Last name',
            validators: [validator('presence', true),]
        },
        email: {
            validators: [
              validator('presence', true),
              validator('format', {
                type: 'email'
              })
            ]
          },
        address: {
            description: 'Address',
            validators: [validator('presence', true),]
        },
        phonenumber: {
            description: 'Phone number',
            validators: [validator('presence', true), validator('format', {
                allowBlank: false,
                type: 'phone'
            })]
        },
        numberofstudents: {
            description: 'Number of students',
            validators: [
				validator('presence', true),
				validator('number', {
					allowString: true,
					integer: true,
					gt: 0,
					lte: 99
				})
			]
        },
		profile: validator('belongs-to'),
		missingparts: {
			description: 'Missing items',
			validators: [validator('presence', false)]
		},
    },
    {
        debounce: 500
    }
);

export default Model.extend(Validations, {
    firstname: attr('string'),
    lastname: attr('string'),
    email: attr('string'),
    address: attr('string'),
    phonenumber: attr('string'),
    numberofstudents: attr('number'),
    profile: belongsTo('profile'),
    createdon: attr('date'),
    fulfilledon: attr('date'),
    returnedon: attr('date'),
	missingparts: hasMany('item', {
		inverse: 'missingpart'
	}),
    items: hasMany('item')
});
