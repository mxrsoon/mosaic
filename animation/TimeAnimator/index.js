import { Animator } from "../index.js";

/**
 * Class used for animating time-based things.
 * @mixes Animator
 */
export class TimeAnimator extends Animator {
    /**
     * @param {Animator~properties} props - Animator properties.
     */
    constructor(props) {
        super(props);
    }

    /**
     * Function that will be called by the animator on each frame.
     * @type {TimeAnimator~callback}
     */
    get callback() {
        return super.callback;
    }

    set callback(val) {
        super.callback = val;
    }

    getValue(progress) {
        return this.duration * progress;
    }
}

/**
 * @callback TimeAnimator~callback
 * @param {number} currentTime - Current animation time with interpolation applied in milliseconds.
 */