import { PrivateFields } from "../index.js";

/* Private fields for EventHandlerList class */
const privates = new PrivateFields(function() {
	return {
		handlers: []
	};
});

export class EventHandlerList {
	constructor(initialHandlers) {
		privates.setup(this);

		if (initialHandlers) {
			if (!Array.isArray(initialHandlers)) {
				initialHandlers = [initialHandlers];
			}

			for (let handler of initialHandlers) {
				this.add(handler);
			}
		}

	}
	
	add(handler) {
		if (handler instanceof EventHandlerList) {
			handler = handler.invoke;
		} else if (typeof(handler) !== "function") {
			throw new Error("Event handler must be a function or EventHandlerList");
		}

		if (!privates(this).handlers.includes(handler)) {
			privates(this).handlers.push(handler);
		}
	}
	
	remove(handler) {
		if (handler instanceof EventHandlerList) {
			handler = handler.invoke;
		}

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
			handled = handled || handler(...args);
		}

		return handled;
	}
}