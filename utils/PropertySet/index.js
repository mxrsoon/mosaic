function getDescriptor(object, prop) {
	let proto = Object.getPrototypeOf(object, prop);
	
	while (proto) {
		if (proto.hasOwnProperty(prop)) {
			return Object.getOwnPropertyDescriptor(proto, prop);
		}

		proto = Object.getPrototypeOf(proto, prop);
	}
}

/**
 * Utility class for adding/applying properties with defaults for classes.
 */
export class PropertySet {
	/**
	 * Create a PrivateFieldsMap.
	 * @param {function} defaultsGenerator - A function to generate the default properties
	 * that will be applied to objects.
	 */
	constructor(defaultsGenerator) {
		this.defaultsGenerator = defaultsGenerator;
	}

	/**
	 * Merge default values with overrides, without applying the properties to the object.
	 * @param {object} thisArg - Object where the properties would be applied. It's require for using 'this'
	 * inside the defaults generator function.
	 * @param {object} overrides - Object containing values that will override the defaults.
	 * @returns {object} Object containing the final values for the properties.
	 */
	merge(thisArg, overrides = {}) {
		const defaults = this.defaultsGenerator.call(thisArg);
		const output = {};

		for (let prop in defaults) {
			if (defaults.hasOwnProperty(prop)) {
				output[prop] = overrides.hasOwnProperty(prop) ? overrides[prop] : defaults[prop];
			}
		}

		return output;
	}

	/**
	 * Merge default values with overrides, and apply them to an object.
	 * @param {object} object - Object where the properties will be applied.
	 * @param {object} overrides - Object containing values that will override the defaults.
	 * @param {(boolean|string[])} [ignoreErrors] - A boolean indicating whether to ignore errors when applying
	 * each property. Can be an array of property names to ignore errors just when applying them.
	 * @returns {object} Object containing the final values for the properties.
	 */
	apply(object, overrides, ignoreErrors = false) {
		const values = this.merge(object, overrides);

		for (let prop in values) {
			const descriptor = getDescriptor(object, prop);

			if (typeof(values[prop]) !== "undefined" && (!descriptor || descriptor.writable || typeof(descriptor.set) === "function")) {
				try {
					object[prop] = values[prop];
				} catch (e) {
					if (!ignoreErrors || Array.isArray(ignoreErrors) && !ignoreErrors.includes(prop)) {
						throw e;
					}
				}
			}
		}

		return values;
	}
}