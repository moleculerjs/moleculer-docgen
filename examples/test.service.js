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
		 * @actions
		 * @deprecated
		 * @returns {String}
		 */
		hello() {
			return "Hello Moleculer";
		},

		/**
		 * The `welcome` action. Response a Welcome message. 
		 * 
		 * @example 
		 * **Call the action**
		 * ```js
		 * const broker = new ServiceBroker();
		 * broker.createService({
		 * 	name: "greeter",
		 * 	settings: {
		 * 		anonName: "Unnamed"
		 *  }
		 * });
		 * 
		 * broker.call("greeter.welcome", { name: "John" }).then(console.log);
		 * ```
		 * 
		 * @responseExample
		 * 	"Welcome, John"
		 * 
		 * @actions
		 * @deprecated
		 * @cached
		 * 
		 * @param {String} name Name of user
		 * @param {Number?} optional Optional param
		 * @param {Boolean} [isTrue=false] Boolean param with default value
		 * @return {String} Return with the named welcome message
		 * 
		 * **Response example**
		 * ```js
		 * "Welcome, John"
		 * ```
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
		 * @methods
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
		 * @methods
		 * @param {User} user
		 * @param {String} message
		 * @returns {Boolean}
		 */
		send(user, message) {
			return true;
		}

	}
};
