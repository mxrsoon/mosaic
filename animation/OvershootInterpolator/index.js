import { Interpolator } from "@mosaic/animation/index.js";
import { PrivateFields } from "@mosaic/utils/index.js";

/* Private fields for OvershootInterpolator class. */
const privates = new PrivateFields(function() {
    return {
        tension: undefined
    };
});

/**
 * An interpolator where the change flings forward and overshoots the last value then comes back.
 */
export class OvershootInterpolator extends Interpolator {
    /**
     * @param {number} tension - Amount of overshoot. When tension equals 0, there is no overshoot
     * and the interpolator becomes a simple deceleration interpolator.
     */
    constructor(tension = 2) {
        super();
        privates.setup(this);

        if (isFinite(tension) && tension >= 0) {
            privates(this).tension = tension;
        } else {
            throw new Error("Tension must be a finite positive number");
        }
    }

    /**
     * Interpolate a value.
     * @param {number} progress - Value between 0 and 1 meant to be interpolated, usually indicating animation progress.
     * @returns {number} Interpolated value.
     */
    interpolate(progress) {
        progress -= 1;
        return progress * progress * ((privates(this).tension + 1) * progress + privates(this).tension) + 1;
    }
}