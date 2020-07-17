import { PrivateFields } from "#mosaic/utils/index.js";

/* Private fields for TextMetrics class. */
const privates = new PrivateFields(function(props = {}) {
    return {
        initialized: false,

        get props() {
            return props;
        }
    };
});

/**
 * Class for representing text metrics.
 */
export class TextMetrics {
    constructor(props = {}) {
        privates.setup(this);

        this.ascent = props.ascent;
        this.descent = props.descent;
        this.width = props.width;

        privates(this).initialized = true;
    }

    get height() {
        return this.ascent + this.descent;
    }

    get ascent() {
        return privates(this).props.ascent;
    }

    set ascent(val) {
        if (privates(this).initialized) {
            throw new Error("Unable to change TextMetrics after initialization");
        }

        if (isNaN(val)) {
            throw new Error("TextMetrics' ascent must be a number");
        }

        privates(this).props.ascent = Number(val);
    }

    get descent() {
        return privates(this).props.descent;
    }

    set descent(val) {
        if (privates(this).initialized) {
            throw new Error("Unable to change TextMetrics after initialization");
        }

        if (isNaN(val)) {
            throw new Error("TextMetrics' descent must be a number");
        }

        privates(this).props.descent = Number(val);
    }

    get width() {
        return privates(this).props.width;
    }

    set width(val) {
        if (privates(this).initialized) {
            throw new Error("Unable to change TextMetrics after initialization");
        }

        if (isNaN(val)) {
            throw new Error("TextMetrics' width must be a number");
        }

        privates(this).props.width = Number(val);
    }
}