const privatesMap = new WeakMap();
const bindables = ["value", "get", "set"];

/**
 * Utility class for simulating private fields for classes.
 */
export class PrivateFields extends Function {
	/**
	 * Create a PrivateFields instance.
	 * @param {function} templateGenerator - A function to generate the template object
	 * used for new entries.
	 */
	constructor(templateGenerator) {
		super("privates", "object", "return privates.get(object)");

		const privates = new WeakMap();
		
		const bound = this.bind(this, privates);
		bound.templateGenerator = templateGenerator;
		privatesMap.set(bound, privates);

		return bound;
	}

	setup(object, ...generatorArgs) {
		const privates = privatesMap.get(this);
		const template = this.templateGenerator.call(object, ...generatorArgs);
		const descriptors = Object.getOwnPropertyDescriptors(template);

		if (!privates.has(object)) {
			privates.set(object, {});
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

			Object.defineProperty(privates.get(object), prop, descriptor);
		}

		return object;
	}
}