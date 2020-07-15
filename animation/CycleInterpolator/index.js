import { Interpolator } from "@mosaic/animation/index.js";
import { PrivateFields } from "@mosaic/utils/index.js";

/* Private fields for CycleInterpolator class. */
const privates = new PrivateFields(function() {
    return {
        cycles: undefined
    };
});

/**
 * Repeats the animation for a specified number of cycles. The rate of change follows
 * a sinusoidal pattern.
 */
export class CycleInterpolator extends Interpolator {
    /**
     * @param {number} cycles - Number of cycles.
     */
    constructor(cycles) {
        super();
        privates.setup(this);

        if (isFinite(cycles) && cycles >= 1) {
            privates(this).cycles = cycles;
        } else {
            throw new Error("Cycles must be a number greater than or equal to 1");
        }
    }

    /**
     * Interpolate a value.
     * @param {number} progress - Value between 0 and 1 meant to be interpolated, usually indicating animation progress.
     * @returns {number} Interpolated value.
     */
    interpolate(progress) {
        return Math.sin(2 * privates(this).cycles * Math.PI * progress);
    }
}