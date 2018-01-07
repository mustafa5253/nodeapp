const validationRules = require('../validation-rules');
const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

module.exports = (data, validationKey1, validationKey2, callbackFn) => {
	let validate = ajv.compile(validationRules[validationKey1][validationKey2]);
	let valid = validate(data);
	callbackFn(valid, validate);
}