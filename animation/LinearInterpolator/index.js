import { Interpolator } from "#mosaic/animation/index.js";

/**
 * An interpolator where the rate of change is constant
 */
export class LinearInterpolator extends Interpolator {
    /**
     * Interpolate a value.
     * @param {number} progress - Value between 0 and 1 meant to be interpolated, usually indicating animation progress.
     * @returns {number} Interpolated value. In this case, the progress input as-is.
     */
    interpolate(progress) {
        return progress;
    }
}