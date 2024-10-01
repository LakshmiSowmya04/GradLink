const Env = require('../lib/Env');

const parser = new Env(); // Create an instance of Env

module.exports = {
	port: parser.get('PORT', ['unsigned'], 5000 /* default-value */),
	host: parser.get('HOST', ['ipv4'], '0.0.0.0' /* default-value */),
	mongoDbUri: parser.get('MONGODB_URI', ['required', 'uri']), // required one, throws error if not found
};

