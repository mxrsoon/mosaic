import { PrivateFields, PropertySet, EventHandlerList } from "@mosaic/utils/index.js";
import { Length, Padding } from "@mosaic/layout/index.js";
import { Visibility, Application } from "@mosaic/core/index.js";

/* Default properties for Widget class. */
const properties = new PropertySet(function() {
	return {
		id: undefined,
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		padding: 0,
		hitTestEnabled: true,
		visibility: Visibility.visible,
		focusable: false
	}
});

/* Private fields for Widget class. */
const privates = new PrivateFields(function(props = {}) {
	return {
		drawHandle: undefined,

		events: {
			onClick: new EventHandlerList(),
			onPointerDown: new EventHandlerList(),
			onPointerMove: new EventHandlerList(),
			onPointerUp: new EventHandlerList(),
			onFocus: new EventHandlerList(),
			onFocusLost: new EventHandlerList()
		},
		
		get props() {
			return props;
		}
	};
});

/**
 * A widget that can be drawn 
 * on user's screen by the application.
 */
export class Widget {
	/**
	 * @param {Widget~properties} props - Initial properties.
	 */
	constructor(props) {
		privates.setup(this);
		properties.apply(this, props);
	}

	/** 
	 * Application which this Widget is associated to.
	 * @type {?Application}
	 */
	get application() {
		if (this.parent) {
			return this.parent.application;
		}
		
		return undefined;
	}

	/** 
	 * Widget instance custom identifier.
	 * @type {?number}
	 */
	get id() {
		return privates(this).props.id;
	}

	set id(val) {
		if (typeof(val) === "string" || val instanceof String || val == null) {
			privates(this).props.id = val;
		} else {
			throw new Error("Widget ID must be a string or a nullish value");
		}
	}

	/**
	 * Top-left x-axis coordinate of the widget.
	 * @type {number}
	 */
	get x() {
		return privates(this).props.x;
	}
	
	set x(val) {
		privates(this).props.x = val;
		this.invalidate();
	}

	/**
	 * Top-left y-axis coordinate of the widget.
	 * @type {number}
	 */
	get y() {
		return privates(this).props.y;
	}

	set y(val) {
		privates(this).props.y = val;
		this.invalidate();
	}

	get intrinsicWidth() {
		return new Length(0);
	}

	get intrinsicHeight() {
		return new Length(0);
	}

	get width() {
		return this.visibility !== Visibility.gone ? privates(this).props.width : 0
	}

	set width(val) {
		privates(this).props.width = Length.parse(val, () => this.parent ? this.parent.width : 0);
		this.invalidate();
	}
	
	get height() {
		return this.visibility !== Visibility.gone ? privates(this).props.height : 0;
	}
	
	set height(val) {
		privates(this).props.height = Length.parse(val, () => this.parent ? this.parent.height : 0);
		this.invalidate();
	}

	/**
     * Widget's content padding.
     * @type {Padding}
     */
    get padding() {
        return privates(this).props.padding;
    }

    set padding(val) {
        if (!(val instanceof Padding)) {
            val = new Padding(val);
		}
		
		const currentValue = privates(this).props.padding;

		if (currentValue) {
			currentValue.onChange.remove(this.invalidate);
		}
		
		privates(this).props.padding = val;
		val.onChange.add(this.invalidate);
		this.invalidate();
    }

	get hitTestEnabled() {
		return privates(this).props.hitTestEnabled;
	}

	set hitTestEnabled(val) {
		privates(this).props.hitTestEnabled = val;
	}

	get focusable() {
		return privates(this).props.focusable;
	}

	set focusable(val) {
		privates(this).props.focusable = val;
	}

	get focused() {
		return this.application && this.application.focusedWidget === this;
	}

	get visibility() {
		return privates(this).props.visibility;
	}

	set visibility(val) {
		if (val instanceof Visibility) {
			privates(this).props.visibility = val;
		}
	}

	/** @type {EventHandlerList} */
	get onClick() {
		return privates(this).events.onClick;
	}

	set onClick(val) {
		throw new Error("Event handler lists are readonly, use the 'add(handler)' function");
	}

	/** @type {EventHandlerList} */
	get onPointerDown() {
		return privates(this).events.onPointerDown;
	}

	set onPointerDown(val) {
		throw new Error("Event handler lists are readonly, use the 'add(handler)' function");
	}

	/** @type {EventHandlerList} */
	get onPointerMove() {
		return privates(this).events.onPointerMove;
	}

	set onPointerMove(val) {
		throw new Error("Event handler lists are readonly, use the 'add(handler)' function");
	}

	/** @type {EventHandlerList} */
	get onPointerUp() {
		return privates(this).events.onPointerUp;
	}

	set onPointerUp(val) {
		throw new Error("Event handler lists are readonly, use the 'add(handler)' function");
	}

	/** @type {EventHandlerList} */
	get onFocus() {
		return privates(this).events.onFocus;
	}

	set onFocus(val) {
		throw new Error("Event handler lists are readonly, use the 'add(handler)' function");
	}

	/** @type {EventHandlerList} */
	get onFocusLost() {
		return privates(this).events.onFocusLost;
	}

	set onFocusLost(val) {
		throw new Error("Event handler lists are readonly, use the 'add(handler)' function");
	}

	focus() {
		if (this.application) {
			this.application.focusedWidget = this;
		}
	}

	hitTest(x, y) {
		return this.hitTestEnabled && this.visibility !== Visibility.gone
			&& this.x <= x && x <= this.x + this.width
			&& this.y <= y && y <= this.y + this.height;
	}

	draw(canvas) {
		
	}
	
	invalidate = () => {
		if (this.application) {
			this.application.invalidate();
		}
	}
}

/**
 * @typedef {object} Widget~properties
 * @prop {number} [x = 0] Horizontal coordinate.
 * @prop {number} [y = 0] Vertical coordinate.
 * @prop {number} [width = 0] Desired width.
 * @prop {number} [height = 0] Desired height.
 * @prop {boolean} [visibility = Visibility.visible] Visibility state of the widget.
 * @prop {boolean} [hitTestEnabled = true] Whether or not the widget is valid for hit testing.
 * If disabled, the element can't be interacted with using a pointer.
 */