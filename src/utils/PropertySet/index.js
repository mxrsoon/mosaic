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

	apply(object, overrides, ...generatorArgs) {
		const defaults = this.defaultsGenerator.call(object, ...generatorArgs);

		for (let prop in defaults) {
			if (defaults.hasOwnProperty(prop)) {
				const descriptor = getDescriptor(object, prop);

				if (!descriptor || descriptor.writable || typeof(descriptor.set) === "function") {
					object[prop] = overrides.hasOwnProperty(prop) ? overrides[prop] : defaults[prop];
				}
			}
		}

		return object;
	}
}