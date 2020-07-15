import { Animator, AnimationState } from "#mosaic/animation/index.js";
import { PropertySet, PrivateFields } from "#mosaic/utils/index.js";

/* Default properties for NumberAnimator class */
const properties = new PropertySet(function() {
    return {
        from: 0,
        to: 0
    };
});

/* Private fields for NumberAnimator class */
const privates = new PrivateFields(function(props = {}) {
    return {
        get props() {
            return props;
        }
    };
});

/**
 * Class used for animating numbers.
 * @mixes Animator
 */
export class NumberAnimator extends Animator {
    /**
     * @param {NumberAnimator~properties} props - Animator properties.
     */
    constructor(props) {
        super(props);
        privates.setup(this);
        properties.apply(this, props);
    }

    /**
     * Function that will be called by the animator on each frame.
     * @type {NumberAnimator~callback}
     */
    get callback() {
        return super.callback;
    }

    set callback(val) {
        super.callback = val;
    }

    /**
     * Initial number to animate from.
     * @type {number}
     */
    get from() {
        return privates(this).props.from;
    }

    set from(val) {
        if (this.state !== AnimationState.running && this.state !== AnimationState.paused) {
            if (!isFinite(val)) {
                throw new Error("Animation 'from' property must be a finite number");
            }

            privates(this).props.from = val;
        } else {
            throw new Error("Animator properties can only be changed if it's stopped");
        }
    }

    /**
     * Final number to animate to.
     * @type {number}
     */
    get to() {
        return privates(this).props.to;
    }

    set to(val) {
        if (this.state !== AnimationState.running && this.state !== AnimationState.paused) {
            if (!isFinite(val)) {
                throw new Error("Animation 'to' property must be a finite number");
            }

            privates(this).props.to = val;
        } else {
            throw new Error("Animator properties can only be changed if it's stopped");
        }
    }

    getValue(progress) {
        return this.from + (this.to - this.from) * progress;
    }
}

/**
 * @callback NumberAnimator~callback
 * @param {number} number - Animated number in current frame.
 */

/**
 * @typedef {object} NumberAnimator~properties
 * @prop {NumberAnimator~callback} callback - Function that will be called by the animator on each frame.
 * @prop {number} [from = 0] - Initial number to animate from.
 * @prop {number} [to = 0] - Final number to animate to.
 * @prop {number} [duration = 0] - Duration in milliseconds.
 * @prop {number} [delay = 0] - Delay between call to start() method and effective animation start in milliseconds.
 * @prop {number} [iterations = 1] - Number indicating how many times this animation will be repeated
 * @prop {Interpolator} [interpolator = new LinearInterpolator()] - Animation progress interpolator.
 * @prop {function} [endCallback] - Function that will be called when animation ends.
 */