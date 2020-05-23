import { PropertySet, PrivateFields } from "../../../utils/index.js";
import { Length } from "../../../layout/index.js";

/* Default properties for TextOptions class. */
const properties = new PropertySet(function() {
    return {
        lineHeight: "120%"
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
     * Measure a text using the passed options.
     * @param {string} text - Text to measure.
     * @param {TextOptions} textOptions - Text to measure.
     * @returns {TextMetrics} Resulting metrics.
     */
    measure(text) {
        // TODO: Implement text measuring
        throw new Error("Not implemented");
    }
}