import { PropertySet, PrivateFields } from "#mosaic/utils/index.js";
import { Length } from "#mosaic/layout/index.js";
import { Canvas } from "#mosaic/platform/drawing/index.js";

/* Default properties for TextOptions class. */
const properties = new PropertySet(function() {
    return {
        lineHeight: "120%",
        fontSize: null,
        fontName: null
    };
});

/* Private fields for TextOptions class. */
const privates = new PrivateFields(function(props = {}) {
    return {
        get props() {
            return props;
        }
    };
});

/** Text rendering options. */
export class TextOptions {
    constructor(props) {
        privates.setup(this);
        properties.apply(this, props);
    }

    /**
     * Text line height.
     * @type {Length}
     */
    get lineHeight() {
        return privates(this).props.lineHeight;
    }

    set lineHeight(val) {
        privates(this).props.lineHeight = Length.parse(val, () => this.fontSize || 0);
    }

    /**
     * Text font size.
     * @type {Length}
     */
    get fontSize() {
        return privates(this).props.fontSize;
    }

    set fontSize(val) {
        privates(this).props.fontSize = Length.parse(val, 0);
    }

    /**
     * Text font name.
     * @type {string}
     */
    get fontName() {
        return privates(this).props.fontName;
    }

    set fontName(val) {
        if (typeof(val) === "string" || val instanceof String) {
            privates(this).props.fontName = val;
        } else {
            throw new Error("Font name must be a string");
        }
    }

    /**
     * Measure a text using this object's options.
     * @param {string} text - Text to measure.
     * @returns {TextMetrics} Resulting metrics.
     */
    measure(text) {
        return new Canvas().measureText(text, this);
    }
}