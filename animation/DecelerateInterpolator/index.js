import { Interpolator } from "../index.js";
import { PrivateFields } from "../../utils/index.js";

/* Private fields for DecelerateInterpolator class. */
const privates = new PrivateFields(function() {
    return {
        factor: undefined
    };
});

/**
 * An interpolator where the rate of change starts out quickly and and then decelerates.
 */
export class DecelerateInterpolator extends Interpolator {
    /**
     * @param {number} factor - Degree to which the animation should be eased. Setting factor to 1
     * produces an upside-down y=x^2 parabola. Increasing factor above 1 exaggerates the ease-out
     * effect (i.e., it starts even faster and ends evens slower).
     */
    constructor(factor = 1) {
        super();
        privates.setup(this);

        if (isFinite(factor) && factor >= 0) {
            privates(this).factor = factor;
        } else {
            throw new Error("Factor must be a finite positive number");
        }
    }

    /**
     * Interpolate a value.
     * @param {number} progress - Value between 0 and 1 meant to be interpolated, usually indicating animation progress.
     * @returns {number} Interpolated value.
     */
    interpolate(progress) {
        return 1 - (1 - progress) ** (2 * privates(this).factor);
    }
}