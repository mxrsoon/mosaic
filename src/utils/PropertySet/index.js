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
	 * Merge default values with overrides, without applying the properties to any object.
	 * @param {object} overrides - Object containing values that will override the defaults.
	 * @returns {object} Object containing the final values for the properties.
	 */
	merge(overrides) {
		const defaults = this.defaultsGenerator.call(object);
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
		const values = this.merge(overrides);

		for (let prop in values) {
			const descriptor = getDescriptor(object, prop);

			if (!descriptor || descriptor.writable || typeof(descriptor.set) === "function") {
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