import { PrivateFields, PropertySet, HandlerList } from "../../utils/index.js";
import { View, Widget } from "../index.js";
import { Canvas } from "../../drawing/index.js";
import { Theme } from "../../resources/index.js";
import { Platform } from "../../platform/index.js";
import { Viewport } from "../../platform/viewport/index.js";

/* Reference to the Application instance associated with current JS context. */
let currentApplication;

/* Default properties for Application class. */
const properties = new PropertySet(function() {
	return {
		view: undefined,
		theme: undefined
	};
});

/* Private fields for Application class. */
const privates = new PrivateFields(function(props = {}) {
	return {
		viewport: undefined,
		drawHandle: undefined,
		focusedWidget: undefined,

		events: {
			onClick: new HandlerList(),
			onPointerDown: new HandlerList(),
			onPointerMove: new HandlerList(),
			onPointerUp: new HandlerList(),
			onResize: new HandlerList()
		},

		get props() {
			return props;
		},

		resize(width, height) {
			this.onResize.invoke(width, height);
			this.invalidate();
		},

		filterPointerEvent(handlerName) {
			return (e) => {
				if (this.view) {
					const widgets = this.view.getWidgetsAt(e.clientX, e.clientY);
					let handled = false;

					for (let widget of widgets) {
						handled = widget[handlerName].invoke({ x: e.offsetX - widget.x, y: e.offsetY - widget.y });
						
						if (handled) {
							break;
						}
					}

					if (!handled) {
						this[handlerName].invoke({ x: e.clientX, y: e.clientY });
					}

					if (handlerName === "onClick") {
						if (widgets.length > 0 && widgets[0].focusable) {
							this.focusedWidget = widgets[0];
						} else {
							this.focusedWidget = undefined;
						}
					}
				} else {
					this[handlerName].invoke({ x: e.clientX, y: e.clientY });
				}
			};
		},

		setupEvents() {
			window.addEventListener("click", this.$.filterPointerEvent("onClick"));
			window.addEventListener("pointerdown", this.$.filterPointerEvent("onPointerDown"));
			window.addEventListener("pointermove", this.$.filterPointerEvent("onPointerMove"));
			window.addEventListener("pointerup", this.$.filterPointerEvent("onPointerUp"));
			this.viewport.onResize.add(this.onResize);
		}
	};
});

/**
 * An application that can draw and manage Views.
 */
export class Application {
	constructor(props = {}) {
		if (Application.current) {
			throw new Error("Only one Application instance per JavaScript context is allowed");
		}

		privates.apply(this);
		
		this.$.viewport = Platform.current.viewport;

		this.$.setupEvents();
		this.$.resize(this.viewport.width, this.viewport.height);
		
		properties.apply(this, props);

		currentApplication = this;
	}

	/**
	 * Current application theme.
	 * @type {Theme}
	 */
	get theme() {
		return this.$.props.theme;
	}

	set theme(val) {
		if (val instanceof Theme) {
			this.$.props.theme = val;
		} else if (val == null) {
			this.$.props.theme = undefined;
		} else {
			throw new Error("Invalid theme type");
		}

		this.invalidate();
	}

	/**
	 * Current application scale factor.
	 * @type {number}
	 */
	get scaleFactor() {
		return this.viewport.scaleFactor;
	}

	/**
	 * Current application width.
	 * @type {number}
	 */
	get width() {
		return this.viewport.width;
	}

	/**
	 * Current application height.
	 * @type {number}
	 */
	get height() {
		return this.viewport.height;
	}

	/**
	 * The current application. A reference for itself.
	 * @type {Application} 
	 */
	get application() {
		return this;
	}

	/**
	 * Current viewport used for displaying this application.
	 * @type {Viewport}
	 */
	get viewport() {
		return this.$.viewport;
	}

	/**
	 * Current focused widget.
	 * @type {Widget}
	 */
	get focusedWidget() {
		return this.$.focusedWidget;
	}

	set focusedWidget(val) {
		if (this.focusedWidget === val) return;
		
		if (val instanceof Widget && val.focusable || val == null) {
			const lastFocused = this.focusedWidget;
			this.$.focusedWidget = val;
			
			if (val) {
				val.onFocus.invoke();
			}

			if (lastFocused) {
				lastFocused.onFocusLost.invoke();
			}
		} else {
			throw new Error("Focused widget must be a focusable Widget instance or a nullish value");
		}
	}

	/**
	 * Current view for this application.
	 * @type {View}
	 */
	get view() {
		return this.$.props.view;
	}

	set view(val) {
		if (this.$.props.view && this.$.props.view.parent === this) {
			this.$.props.view.parent = undefined;
		}

		this.$.props.view = val;

		if (val) {
			val.parent = this;
		}
		
		this.invalidate();
	}

	/** @type {HandlerList} */
	get onResize() {
		return this.$.events.onResize;
	}

	set onResize(val) {
		throw new Error("Event handler lists are readonly, use the 'add(handler)' function");
	}

	/** @type {HandlerList} */
	get onClick() {
		return this.$.events.onClick;
	}

	set onClick(val) {
		throw new Error("Event handler lists are readonly, use the 'add(handler)' function");
	}

	/** @type {HandlerList} */
	get onPointerDown() {
		return this.$.events.onPointerDown;
	}

	set onPointerDown(val) {
		throw new Error("Event handler lists are readonly, use the 'add(handler)' function");
	}

	/** @type {HandlerList} */
	get onPointerMove() {
		return this.$.events.onPointerMove;
	}

	set onPointerMove(val) {
		throw new Error("Event handler lists are readonly, use the 'add(handler)' function");
	}

	/** @type {HandlerList} */
	get onPointerUp() {
		return this.$.events.onPointerUp;
	}

	set onPointerUp(val) {
		throw new Error("Event handler lists are readonly, use the 'add(handler)' function");
	}

	/**
     * Search for a Widget with the specified id.
     * @param {string} id - ID to search for.
     * @returns {?Widget} A widget with the searched ID if it was found, or undefined if not.
     */
    findId(id) {
        if (this.view) {
			return this.view.findId(id);
		}
    }
	
	/** Draw the application on screen. */
	draw() {
		/** @type {Canvas} */
		const canvas = this.viewport.canvas;

		canvas.width = window.innerWidth * this.scaleFactor;
		canvas.height = window.innerHeight * this.scaleFactor;
		canvas.scaleFactor = this.scaleFactor;
		
		canvas.clear();
		
		if (this.view) {
			this.view.draw(canvas);
		}
	}

	/** Invalidate the current render and schedule draw for next frame. */
	invalidate() {
		if (typeof(this.$.drawHandle) === "undefined") {
			this.$.drawHandle = requestAnimationFrame(() => {
				this.draw();
				this.$.drawHandle = undefined;
			});
		}
	}

	static get current() {
		return currentApplication;
	}
}