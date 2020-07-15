import { Interpolator } from "#mosaic/animation/index.js";
import { PrivateFields } from "#mosaic/utils/index.js";

/* Private fields for AccelerateInterpolator class. */
const privates = new PrivateFields(function() {
    return {
        factor: undefined
    };
});

/**
 * An interpolator where the rate of change starts out slowly and and then accelerates.
 */
export class AccelerateInterpolator extends Interpolator {
    /**
     * @param {number} factor - Degree to which the animation should be eased. Seting factor to
     * 1 produces a y=x^2 parabola. Increasing factor above 1 exaggerates the ease-in effect
     * (i.e., it starts even slower and ends evens faster).
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
        return progress ** (2 * privates(this).factor);
    }
}