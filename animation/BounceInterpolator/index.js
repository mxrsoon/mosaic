import { Interpolator } from "../index.js";

/**
 * An interpolator where the change bounces at the end.
 */
export class BounceInterpolator extends Interpolator {
    /**
     * Interpolate a value.
     * @param {number} progress - Value between 0 and 1 meant to be interpolated, usually indicating animation progress.
     * @returns {number} Interpolated value.
     */
    interpolate(progress) {
        progress *= 1.1226;
        if (progress < 0.3535) return progress ** 2 * 8;
        else if (progress < 0.7408) return (progress - 0.54719) ** 2 * 8 + 0.7;
        else if (progress < 0.9644) return (progress - 0.8526) ** 2 * 8 + 0.9;
        else return (progress - 1.0435) ** 2 * 8 + 0.95;
    }
}