import { PrivateFields, PropertySet, HandlerList } from "../../utils/index.js";
import { View, Widget } from "../index.js";
import { Canvas } from "../../drawing/index.js";
import { Theme } from "../../resources/index.js";

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
		canvas: undefined,
		webCanvas: undefined,
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

		createDefaultStyle() {
			const styleSheet = new CSSStyleSheet();
			
			styleSheet.replaceSync(`
				:host, canvas {
					display: block;
					
					position: fixed;
					top: 0;
					right: 0;
					bottom: 0;
					left: 0;

					width: 100%;
					height: 100%;

					overflow: hidden;
					overscroll-behavior: none;
					touch-action: none;
				}

				canvas {
					position: absolute;
					background: transparent;
					pointer-events: none;
				}
			`);

			return styleSheet;
		},

		resize(e) {
			this.scaleFactor = window.devicePixelRatio;
			this.style.width = `${window.innerWidth}px`;
			this.style.height = `${window.innerHeight}px`;
			this.onResize.invoke(window.innerWidth, window.innerHeight);
			this.invalidate();
		},

		filterPointerEvent(handlerName) {
			return (e) => {
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
			};
		},

		setupEvents() {
			window.addEventListener("click", this.$.filterPointerEvent("onClick"));
			window.addEventListener("pointerdown", this.$.filterPointerEvent("onPointerDown"));
			window.addEventListener("pointermove", this.$.filterPointerEvent("onPointerMove"));
			window.addEventListener("pointerup", this.$.filterPointerEvent("onPointerUp"));
			
			window.addEventListener("resize", this.$.resize);
		}
	};
});

/**
 * An application that can draw and manage Views.
 */
export class Application extends HTMLElement {
	constructor(props = {}) {
		super();

		privates.apply(this);

		const shadow = this.attachShadow({ mode: "closed" });
		const canvas = document.createElement("canvas");
		
		this.$.webCanvas = canvas;
		this.$.canvas = new Canvas(canvas);
		
		shadow.adoptedStyleSheets = [this.$.createDefaultStyle()];
		shadow.appendChild(canvas);

		this.$.setupEvents();
		this.$.resize();
		
		properties.apply(this, props);
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
		return this.canvas.scaleFactor;
	}

	set scaleFactor(val) {
		this.canvas.scaleFactor = val;
		this.invalidate();
	}

	/**
	 * Current application width.
	 * @type {number}
	 */
	get width() {
		return this.$.canvas.width / this.scaleFactor;
	}

	/**
	 * Current application height.
	 * @type {number}
	 */
	get height() {
		return this.$.canvas.height / this.scaleFactor;
	}

	/**
	 * The current application. A reference for itself.
	 * @type {Application} 
	 */
	get application() {
		return this;
	}

	/**
	 * Canvas used for drawing this application on the screen.
	 * @type {Canvas}
	 */
	get canvas() {
		return this.$.canvas;
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
	
	/** Draws the application on screen. */
	draw() {
		/** @type {Canvas} */
		const canvas = this.$.canvas;

		canvas.width = window.innerWidth * this.scaleFactor;
		canvas.height = window.innerHeight * this.scaleFactor;
		canvas.scaleFactor = this.scaleFactor;
		
		canvas.clear();
		
		if (this.view) {
			this.view.draw(canvas);
		}
	}

	/** Invalidates the current render, scheduling draw for next frame. */
	invalidate() {
		if (typeof(this.$.drawHandle) === "undefined") {
			this.$.drawHandle = requestAnimationFrame(() => {
				this.draw();
				this.$.drawHandle = undefined;
			});
		}
	}

	/** 
	 * Defines the Application custom element for using in web pages.
	 * @param {string} tagName - Tag name to be used in registration.
	 */
	static defineCustomElement(tagName = "wjs-application") {
		customElements.define(tagName, Application);
	}
}