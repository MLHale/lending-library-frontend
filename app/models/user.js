import Model, { attr, belongsTo } from '@ember-data/model';
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
		firstname: {
			description: 'First name',
			validators: [
				validator('presence', true),
				validator('length', {
					max: 30,
				})
			]
		},
		lastname: {
			description: 'Last name',
			validators: [
				validator('presence', true),
				validator('length', {
					max: 30,
				})
			]
		},
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

export default Model.extend(Validations, {
	username: attr('string'),
	firstname: attr('string'),
	lastname: attr('string'),
	email: attr('string'),
	profile: belongsTo('profile'),
	issuperuser: attr('boolean'),
});