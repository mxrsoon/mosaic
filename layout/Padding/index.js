import { PrivateFields } from "../../utils/index.js";
import { Length } from "../../layout/index.js";

/* Private fields for Padding class */
const privates = new PrivateFields(function() {
    return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };
});

/**
 * Class to represent padding.
 */
export class Padding {
    /**
    * Creates a Padding object. If only the first argument is
    * provided it is assumed for all sides. If two arguments are
    * provided, then the first is used for vertical padding 
    * the second for horizontal.
    * 
    * @param {(Length|number)} top - Top padding length.
    * @param {(Length|number)} right - Right padding length.
    * @param {(Length|number)} bottom - Bottom padding length.
    * @param {(Length|number)} left - Left padding length.
    */
    constructor(top, right, bottom, left) {
        if (arguments.length === 1) {
            left = bottom = right = top;
        } else if (arguments.length === 2) {
            bottom = top;
            left = right;
        } else if (arguments.length !== 4) {
            throw new Error("Padding constructor must be called with 1 or 4 arguments");
        }

        privates.setup(this);

        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
    }

    /**
     * Whether all sides have 0 padding.
     * @type {boolean}
     */
    get isZero() {
        return !!(this.top === 0 && this.right === 0 && this.bottom === 0 && this.left === 0);
    }

    /** 
     * Top padding length.
     * @type {number|Length}
     * */
    get top() {
        return privates(this).top;
    }

    set top(val) {
        if (isFinite(val) && val >= 0) {
            privates(this).top = val;
        } else {
            throw new Error("Padding must be a finite positive number");
        }
    }

    /** 
     * Right padding length.
     * @type {number|Length}
     * */
    get right() {
        return privates(this).right;
    }

    set right(val) {
        if (isFinite(val) && val >= 0) {
            privates(this).right = val;
        } else {
            throw new Error("Padding must be a finite positive number");
        }
    }

    /** 
     * Bottom padding length.
     * @type {number|Length}
     * */
    get bottom() {
        return privates(this).bottom;
    }

    set bottom(val) {
        if (isFinite(val) && val >= 0) {
            privates(this).bottom = val;
        } else {
            throw new Error("Padding must be a finite positive number");
        }
    }

    /** 
     * Left padding length.
     * @type {number|Length}
     * */
    get left() {
        return privates(this).left;
    }

    set left(val) {
        if (isFinite(val) && val >= 0) {
            privates(this).left = val;
        } else {
            throw new Error("Padding must be a finite positive number");
        }
    }
}