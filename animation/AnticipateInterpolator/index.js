import { Interpolator } from "../index.js";
import { PrivateFields } from "../../utils/index.js";

/* Private fields for AnticipateInterpolator class. */
const privates = new PrivateFields(function() {
    return {
        tension: undefined
    };
});

/**
 * An interpolator where the change starts backward then flings forward.
 */
export class AnticipateInterpolator extends Interpolator {
    /**
     * @param {number} tension - Amount of anticipation. When tension equals 0, there is no
     * anticipation and the interpolator becomes a simple acceleration interpolator.
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
        return progress * progress * ((privates(this).tension + 1) * progress - privates(this).tension);
    }
}