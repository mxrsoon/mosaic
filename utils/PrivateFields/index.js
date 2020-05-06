const bindables = ["value", "get", "set"];

/**
 * Utility class for simulating private fields for classes.
 */
export class PrivateFields {
	/**
	 * Create a PrivateFieldsMap.
	 * @param {function} templateGenerator - A function to generate the template object
	 * used for new entries.
	 */
	constructor(templateGenerator) {
		this.templateGenerator = templateGenerator;
	}

	apply(object, ...generatorArgs) {
		const template = this.templateGenerator.call(object, ...generatorArgs);
		const descriptors = Object.getOwnPropertyDescriptors(template);

		if (!("$" in object)) {
			object.$ = {};
		}
		
		for (let prop in descriptors) {
			const descriptor = descriptors[prop];

			for (const bindable of bindables) {
				if (bindable in descriptor && typeof(descriptor[bindable]) === "function") {
					descriptor[bindable] = descriptor[bindable].bind(object);
				}
			}

			descriptor.enumerable = false;
			descriptor.configurable = false;

			Object.defineProperty(object.$, prop, descriptor);
		}

		return object;
	}
}