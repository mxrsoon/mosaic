import { PrivateFields, EventHandlerList } from "@mosaic/utils/index.js";
import { Length } from "@mosaic/layout/index.js";

/* Private fields for CornerRadius class */
const privates = new PrivateFields(function() {
    return {
        topLeft: 0,
        topRight: 0,
        bottomRight: 0,
        bottomLeft: 0,

        events: {
            onChange: new EventHandlerList()
        }
    };
});

/**
 * Class to represent corner radiuses.
 */
export class CornerRadius {
    /**
    * Creates a CornerRadius object. If only the first argument is
    * provided it is assumed for all corners.
    * 
    * @param {(Length|number)} topLeft - Top-left corner radius.
    * @param {(Length|number)} topRight - Top-right corner radius.
    * @param {(Length|number)} bottomRight - Bottom-right corner radius.
    * @param {(Length|number)} bottomLeft - Bottom-left corner radius.
    */
    constructor(topLeft, topRight, bottomRight, bottomLeft) {
        if (arguments.length === 1) {
            bottomLeft = bottomRight = topRight = topLeft;
        } else if (arguments.length !== 4) {
            throw new Error("CornerRadius constructor must be called with 1 or 4 arguments");
        }

        privates.setup(this);

        this.topLeft = topLeft;
        this.topRight = topRight;
        this.bottomRight = bottomRight;
        this.bottomLeft = bottomLeft;
    }

    /**
     * Whether all corners are sharp, with 0 radius.
     * @type {boolean}
     */
    get isSharp() {
        return !!(this.topLeft === 0 && this.topRight === 0 && this.bottomRight === 0 && this.bottomLeft === 0);
    }

    /** 
     * Top-left corner radius.
     * @type {number|Length}
     * */
    get topLeft() {
        return privates(this).topLeft;
    }

    set topLeft(val) {
        if (isFinite(val) && val >= 0) {
            privates(this).topLeft = val;
            this.onChange.invoke();
        } else {
            throw new Error("Corner radius must be a finite positive number");
        }
    }

    /** 
     * Top-right corner radius.
     * @type {number|Length}
     * */
    get topRight() {
        return privates(this).topRight;
    }

    set topRight(val) {
        if (isFinite(val) && val >= 0) {
            privates(this).topRight = val;
            this.onChange.invoke();
        } else {
            throw new Error("Corner radius must be a finite positive number");
        }
    }

    /** 
     * Bottom-right corner radius.
     * @type {number|Length}
     * */
    get bottomRight() {
        return privates(this).bottomRight;
    }

    set bottomRight(val) {
        if (isFinite(val) && val >= 0) {
            privates(this).bottomRight = val;
            this.onChange.invoke();
        } else {
            throw new Error("Corner radius must be a finite positive number");
        }
    }

    /** 
     * Bottom-left corner radius.
     * @type {number|Length}
     * */
    get bottomLeft() {
        return privates(this).bottomLeft;
    }

    set bottomLeft(val) {
        if (isFinite(val) && val >= 0) {
            privates(this).bottomLeft = val;
            this.onChange.invoke();
        } else {
            throw new Error("Corner radius must be a finite positive number");
        }
    }
    
    /** @type {EventHandlerList} */
    get onChange() {
        return privates(this).events.onChange;
    }

    set onChange(val) {
        throw new Error("Event handler lists are readonly, use the 'add(handler)' function");
    }
}