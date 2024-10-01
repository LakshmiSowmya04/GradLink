/**
 * Env. variable parser
 * @module lib/Env
 * @requires dotenv
 */

const path = require('path');

require("dotenv").config({
	path: path.resolve(process.cwd(), '.env'),
}); // Load environment variables from .env file

// defined rule-set
const RULES = [
	'required',
	'string',
	'number',
	'boolean',
	'array',
	'ipv4',
	'ipv6',
	'url',
	'uri',
	'email',
	'unsigned',
	'integer',
	'float',
];

// Env class
class Env {
	constructor() {
		this.raw = JSON.parse(JSON.stringify(process.env)); // Raw environment variables as key-value data only
	}

	get(key /* string */, // required 
		rules /* string[] */ = ['required'], // optional 
		defaultValue /* default value */ = null // optional
	) {
		// check if key is provided or not and is it a valid key
		if (!key || typeof key !== 'string') {
			throw new Error('Invalid key provided!');
		}

		// check if the given rules are valid or not
		if (rules.length >= 1 && rules.some((rule) => !RULES.includes(rule))) {
			throw new Error('Invalid rules provided!');
		}

		// check if the key exists in the environment variables when required is set
		if (rules.includes('required') && !this.raw[key]) {
			throw new Error(`Environment variable ${key} is required!`);
		}

		// check if the key is not required and not exists in the environment variables
		if (!this.raw[key]) return defaultValue;

		/// validate the value based on the rules
		const value = this.raw[key];
		rules.forEach((rule) => {
			if (rule === 'required') return; // skip required rule
			this[rule](value); // validate the value
		}); // throw error if any validation fails

		return value; // if everything is fine, return the value
	}
	// Validate: string
	string(ctx) {
		if (typeof ctx !== 'string' || ctx.length === 0) {
			throw new Error('Invalid string provided!');
		}

		ctx = ctx.trim(); // remove leading and trailing spaces
	}
	// Validate: number
	number(ctx) {
		try {
			ctx = Number(ctx);

			if (typeof ctx !== 'number' || isNaN(ctx)) {
				throw new Error('Invalid number provided!');
			}
		}
		catch(err) {
			throw new Error('Invalid number provided!', err);
		}
	}
	// Validate: boolean
	boolean(ctx) {
		if (typeof ctx !== 'boolean') {
			throw new Error('Invalid boolean provided!');
		}
		ctx = ctx === 'true' || ctx === true;
	}
	// Validate: array
	array(ctx) {
		// ctx can be an array or a stringified array by using commas
		if (typeof ctx === 'string') ctx = ctx.split(',');

		if (!Array.isArray(ctx)) throw new Error('Invalid array provided!');
	}
	// Validate: ipv4
	ipv4(ctx) {
		// const ipv4Regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
		// ipv4 address can be in the format of xxx.xxx.xxx.xxx
		// where each block can be 1-3 digits and range from 0-255
		const ipv4Regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
		if (!ipv4Regex.test(ctx)) throw new Error('Invalid ipv4 address provided!');

		// check if the address is valid
		const blocks = ctx.split('.');
		if (blocks.some((block) => parseInt(block) > 255)) {
			throw new Error('Invalid ipv4 address provided!');
		} else if (blocks.length !== 4) {
			throw new Error('Invalid ipv4 address provided!');
		} else if (blocks.some((block) => block.length > 1 && block.startsWith('0'))) {
			throw new Error('Invalid ipv4 address provided!');
		} else if (blocks.some((block) => parseInt(block) < 0)) {
			throw new Error('Invalid ipv4 address provided!');
		} else if (blocks.some((block) => isNaN(block))) {
			throw new Error('Invalid ipv4 address provided!');
		}
	}
	// Validate: ipv6
	ipv6(ctx) {
		// ipv6 address can be in the format of xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx
		// where each block can be 4 digits and range from 0-FFFF
		const ipv6Regex = /^(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}$/;
		if (!ipv6Regex.test(ctx)) throw new Error('Invalid ipv6 address provided!');

		// check if the address is valid
		const blocks = ctx.split(':');
		if (blocks.some((block) => block.length > 4)) {
			throw new Error('Invalid ipv6 address provided!');
		} else if (blocks.length !== 8) {
			throw new Error('Invalid ipv6 address provided!');
		} else if (blocks.some((block) => parseInt(block, 16) < 0)) {
			throw new Error('Invalid ipv6 address provided!');
		} else if (blocks.some((block) => isNaN(parseInt(block, 16)))) {
			throw new Error('Invalid ipv6 address provided!');
		}
	}
	// Validate: url
	url(ctx) {
		// protocol can be optional
		// domain name can be any character except space
		const urlRegex = /^(http|https):\/\/[^ "]+$/;
		if (!urlRegex.test(ctx)) throw new Error('Invalid url provided!');
	}
	// Validate: uri
	uri(ctx) {
		// uri can be any character except space
		// example: mongodb://localhost:27017/mydb
		// example: redis://localhost:6379
		// example: amqp://localhost:5672
		// pattern: protocol://host:port?/db?/collection?...
		const uriRegex = /^[^ "]+$/;
		if (!uriRegex.test(ctx)) throw new Error('Invalid uri provided!');

		// Split the URI into protocol and the rest of the URI
		const parts = ctx.split('://');
		if (parts.length !== 2) throw new Error('Invalid uri provided!');
		const [protocol, rest] = parts;
		if (!protocol || !rest) throw new Error('Invalid uri provided!');

		// Split to separate optional user info from host info
		const userInfoSplit = rest.split('@');
		const hostPart = userInfoSplit.length > 1 ? userInfoSplit[1] : userInfoSplit[0];

		// Extract the host and the rest (port/db)
		const [hostAndPort, ..._pathParts] = hostPart.split('/');
		const [hostname, port] = hostAndPort.split(':');

		if (!hostname) throw new Error('Invalid uri provided!');
		if (port && (isNaN(port) || port < 1 || port > 65535)) throw new Error('Invalid port provided!');
	}


	// Validate: email
	email(ctx) {
		// email can be any character except space
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(ctx)) throw new Error('Invalid email provided!');
	}
	// Validate: unsigned
	unsigned(ctx) {
		this.number(ctx);
		if (ctx < 0) throw new Error('Invalid unsigned number provided!');
	}
	// Validate: integer
	integer(ctx) {
		this.number(ctx);
		if (!Number.isInteger(Number(ctx))) throw new Error('Invalid integer provided!');
		ctx = parseInt(ctx);
	}
	// Validate: float
	float(ctx) {
		this.number(ctx);
		if (!Number.isFinite(Number(ctx))) throw new Error('Invalid float provided!');
		ctx = parseFloat(ctx);
	}
};















// Export the Env class
module.exports = Env;