import { Abstract } from "@mosaic/utils/index.js";

/**
 * Interpolator class to be used with Animators.
 * @abstract
 */
export class Interpolator extends Abstract {
    /**
     * Interpolate a value.
     * @param {number} progress - Value between 0 and 1 meant to be interpolated, usually indicating animation progress.
     * @returns {number} Interpolated value. Can be more than 1.0 for interpolators which overshoot their targets, or less than 0 for interpolators that undershoot their targets.
     */
    interpolate(progress) {
        throw new Error("Not implemented");
    }
}