import { PrivateFields } from "../index.js";

/* Private fields for HandlerList class */
const privates = new PrivateFields(function() {
	return {
		handlers: []
	};
});

export class HandlerList {
	constructor() {
		privates.setup(this);
	}
	
	add(handler) {
		if (!privates(this).handlers.includes(handler)) {
			privates(this).handlers.push(handler);
		}
	}
	
	remove(handler) {
		const idx = privates(this).handlers.indexOf(handler);
		
		if (idx >= 0) {
			privates(this).handlers.splice(idx, 1);
			return true;
		}
		
		return false;
	}
	
	invoke(...args) {
		let handled = false;

		for (let handler of privates(this).handlers) {
			handled = handled || handler instanceof HandlerList ? handler.invoke(...args) : handler(...args);
		}

		return handled;
	}
}