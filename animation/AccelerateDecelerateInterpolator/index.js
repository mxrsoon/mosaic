import { Interpolator } from "#mosaic/animation/index.js";

/**
 * An interpolator where the rate of change starts and ends slowly but accelerates through the middle.
 */
export class AccelerateDecelerateInterpolator extends Interpolator {
    /**
     * Interpolate a value.
     * @param {number} progress - Value between 0 and 1 meant to be interpolated, usually indicating animation progress.
     * @returns {number} Interpolated value.
     */
    interpolate(progress) {
        return (Math.cos((progress + 1) * Math.PI) / 2) + .5;
    }
}