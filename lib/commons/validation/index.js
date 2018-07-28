const tv4 = require('tv4');

const logger = require('../logger');
const eventSchema = require('./schemas/event');

tv4.addSchema(eventSchema);
const badRequest = 400;

const validation = (() => {
	const formatErrorMessage = (result) => {
		const errors = [];
		result.errors.forEach((error) => {
			errors.push(`${error.dataPath ? `${error.dataPath} - ` : ''}${error.message}`);
		});
		return errors;
	};

	const event = (req, res, next) => {
		const result = tv4.validateMultiple(req.body, 'event');
		if (!result.valid) {
			const error = formatErrorMessage(result);
			logger.error(`Validation error in save event: ${error}`);
			return res.status(badRequest).send(error);
		}
		next();
	};

	return {
		event
	};
})();

module.exports =  validation;