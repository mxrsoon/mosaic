import { PrivateFields } from "#mosaic/utils/index.js";
import { PixelLength, PercentageLength } from "#mosaic/layout/index.js";

/* Private fields for Length class */
const privates = new PrivateFields(function(value) {
    return {
        value: value
    };
});

const regexes = {
    number: /^[+-]?([0-9]*[.])?[0-9]+$/,
    pixel: /^[+-]?([0-9]*[.])?[0-9]+px$/,
    percentage: /^[+-]?([0-9]*[.])?[0-9]+%$/
};

/**
 * Represents an absolute or relative length value.
 */
export class Length {
    constructor(value) {
        if (!isFinite(value)) {
            throw new Error("Invalid size, must be numeric");
        }

        privates.setup(this, value);
    }

    /**
     * Returns the absolute numeric length in pixels. For relative lengths it
     * returns the current value for the time when the function is being called.
     * @returns {number}
     */
    valueOf() {
        return privates(this).value;
    }

    /**
     * Returns the absolute length in pixels as a string. For relative lengths it
     * returns the current value for the time when the function is being called.
     * @returns {string}
     */
    toString() {
        return String(this.valueOf());
    }

    /**
     * Parse a value into a Length.
     * @param {(string|number|Length)} value - Value to be parsed.
     * @param {(function|number|Length)} relativeTo - Number, length, or a function that
     * returns one, whose value will be used to calculate relative lengths.
     * @returns {Length} The resulting Length object.
     */
    static parse(value, relativeTo = undefined) {
        if (value instanceof Length) {
            return value;
        } else if (typeof(value) === "string" || value instanceof String) {
            
            // Numeric string
            if (value.match(regexes.number))
                return new Length(parseFloat(value));

            // Percentage string
            else if (value.match(regexes.percentage))
                return new PercentageLength(parseFloat(value) / 100, relativeTo);
            
            // Pixel string
            else if (value.match(regexes.pixel))
                return new PixelLength(parseFloat(value));

        } else if (isFinite(value)) {
            return new Length(value);
        }
    }
}