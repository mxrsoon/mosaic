import { Interpolator } from "#mosaic/animation/index.js";
import { PrivateFields } from "#mosaic/utils/index.js";

/* Private fields for AnticipateOvershootInterpolator class. */
const privates = new PrivateFields(function() {
    return {
        tension: undefined
    };
});

/* Auxiliar function for interpolation */
function a(t, s) {
    return t ** 2 * ((s + 1) * t - s);
}

/* Auxiliar function for interpolation */
function o(t, s) {
    return t ** 2 * ((s + 1) * t + s);
}

/**
 * An interpolator where the change starts backward then flings forward and overshoots
 * the target value and finally goes back to the final value.
 */
export class AnticipateOvershootInterpolator extends Interpolator {
    /**
     * @param {number} tension - Amount of anticipation/overshoot. When tension equals 0, there is
     * no anticipation/overshoot and the interpolator becomes a simple acceleration/deceleration interpolator.
     * @param {number} extraTension - Amount by which to multiply the tension. For instance, to get the same
     * overshoot as an OvershootInterpolator with a tension of 2, you would use an extraTension of 1.5.
     */
    constructor(tension = 2, extraTension = 1.5) {
        super();
        privates.setup(this);

        if (isFinite(tension) && tension >= 0) {
            privates(this).tension = tension;
        } else {
            throw new Error("Tension must be a finite positive number");
        }

        if (isFinite(extraTension) && extraTension >= 0) {
            privates(this).tension *= extraTension;
        } else {
            throw new Error("Extra tension must be a finite positive number");
        }
    }

    /**
     * Interpolate a value.
     * @param {number} progress - Value between 0 and 1 meant to be interpolated, usually indicating animation progress.
     * @returns {number} Interpolated value.
     */
    interpolate(progress) {
        if (progress < .5) {
            return .5 * a(progress * 2, privates(this).tension);
        } else {
            return .5 * (o(progress * 2 - 2, privates(this).tension) + 2);
        }
    }
}