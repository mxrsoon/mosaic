export class HandlerList {
	constructor() {
		this.$ = {
			handlers: []
		}
	}
	
	add(handler) {
		if (handler instanceof HandlerList) {
			handler = handler.invoke;
		}

		if (!this.$.handlers.includes(handler)) {
			this.$.handlers.push(handler);
		}
	}
	
	remove(handler) {
		if (handler instanceof HandlerList) {
			handler = handler.invoke;
		}
		
		const idx = this.$.handlers.indexOf(handler);
		
		if (idx >= 0) {
			this.$.handlers.splice(idx, 1);
			return true;
		}
		
		return false;
	}
	
	invoke(...args) {
		let handled = false;

		for (let handler of this.$.handlers) {
			handled = handled || handler(...args);
		}

		return handled;
	}
}