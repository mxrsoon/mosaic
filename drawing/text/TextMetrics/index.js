import { PrivateFields, PropertySet } from "../../../utils/index.js";

/* Default properties for TextOptions class. */
const properties = new PropertySet(function() {
    return {
        ascent: 0,
        descent: 0,
        width: 0
    };
});

/* Private fields for TextOptions class. */
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
    constructor(props) {
        privates.apply(this);
        properties.apply(this, props);
        this.$.initialized = true;
    }

    get height() {
        return this.ascent + this.descent;
    }

    get ascent() {
        return this.$.props.ascent;
    }

    set ascent(val) {
        if (this.$.initialized) {
            throw new Error("Unable to change TextMetrics after initialization");
        }

        if (isNaN(val)) {
            throw new Error("TextMetrics' ascent must be a number");
        }

        this.$.props.ascent = Number(val);
    }

    get descent() {
        return this.$.props.descent;
    }

    set descent(val) {
        if (this.$.initialized) {
            throw new Error("Unable to change TextMetrics after initialization");
        }

        if (isNaN(val)) {
            throw new Error("TextMetrics' descent must be a number");
        }

        this.$.props.descent = Number(val);
    }

    get width() {
        return this.$.props.width;
    }

    set width(val) {
        if (this.$.initialized) {
            throw new Error("Unable to change TextMetrics after initialization");
        }

        if (isNaN(val)) {
            throw new Error("TextMetrics' width must be a number");
        }

        this.$.props.width = Number(val);
    }
}