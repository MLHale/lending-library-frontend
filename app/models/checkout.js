import DS from 'ember-data';
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
            validators: [validator('presence', true)]
        },
        profile: validator('belongs-to')
    },
    {
        debounce: 500
    }
);

export default DS.Model.extend(Validations, {
    firstname: DS.attr('string'),
    lastname: DS.attr('string'),
    email: DS.attr('string'),
    address: DS.attr('string'),
    phonenumber: DS.attr('string'),
    numberofstudents: DS.attr('number'),
    profile: DS.belongsTo('profile'),
    createdon: DS.attr('date'),
    fulfilledon: DS.attr('date'),
    returnedon: DS.attr('date'),
    missingparts: DS.attr(),
    items: DS.hasMany('item')
});
