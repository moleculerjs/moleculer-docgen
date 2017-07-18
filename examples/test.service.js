"use strict";

/**
 * Greeter test service
 * 
 * @example
 * ```js
 * const broker = new ServiceBroker();
 * broker.createService(GreeterService);
 * ```
 * 
 * @name GreeterService
 * @module Service
 */
module.exports = {
	// Name of service
	name: "greeter",

	// Default settings
	settings: {
		/**
		 * Use this name if `name` param is not available
		 * @type {String}
		 */
		anonName: "Captain",

		/**
		 * Other settings option
		 * @type {Number|Object}
		 */
		otherParam: 100,

		/** @type {Array} Mandatory option */
		mustOption: null,

		/** @type {Object?} Optional option */
		optional: null,

	},

	actions: {
	
		/**
		 * Hello action. Response the `Hello Moleculer` string.
		 * 
		 * @since 0.0.1
		 * @action
		 * @returns {String}
		 */
		hello() {
			return "Hello Moleculer";
		},

		/**
		 * The `welcome` action. Response a Welcome message. 
		 * 
		 * @example 
		 * const broker = new ServiceBroker();
		 * broker.createService({
		 * 	name: "greeter",
		 *  settings: {
		 * 		anonName: "Unnamed"
		 *  }
		 * });
		 * 
		 * broker.call("greeter.welcome", { name: "John" }).then(console.log);
		 * 
		 * @responseExample
		 * 	"Welcome, John"
		 * 
		 * @action
		 * @deprecated
		 * @cached
		 * @param {String} name Name of user
		 * @returns {String}
		 */
		welcome: {
			params: {
				name: "string"
			},
			cache: {
				keys: ["name"]
			},
			handler(ctx) {
				return `Welcome, ${ctx.params.name}`;
			}
		},

		/**
		 * This is a hidden action
		 * 
		 * @private
		 * @returns {Object}
		 */
		hiddenAction() {	
			return {};
		}
	},

	methods: {

		/**
		 * This is an add function. Adds two number.
		 * 
		 * @param {Number} a 
		 * @param {Number} b 
		 * @returns {Number}
		 */
		add(a, b) {
			return a + b;
		},

		/**
		 * Send a message to the user
		 * 
		 * @param {User} user
		 * @param {String} message
		 * @returns {Boolean}
		 */
		send(user, message) {
			return true;
		}

	}
};
