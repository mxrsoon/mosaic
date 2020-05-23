import { PrivateFields, PropertySet, Abstract } from "../../utils/index.js";
import { Interpolator, LinearInterpolator } from "../index.js";

/** @ignore */
import { Enum } from "../../utils/index.js";

/* Default properties for Animator class */
const properties = new PropertySet(function() {
    return {
        callback: undefined,
        duration: 0,
        delay: 0,
        iterations: 1,
        interpolator: new LinearInterpolator(),
        endCallback: undefined
    };
});

/* Private fields for Animator class */
const privates = new PrivateFields(function(props = {}) {
    return {
        state: AnimationState.stopped,
        tickHandler: undefined,
        startTime: undefined,
        pausedProgress: undefined,
        currentIteration: 0,

        get props() {
            return props
        },
        
        get rawProgress() {
            return Math.min(privates(this).currentTime / this.duration, 1);
        },

        get progress() {
            return this.interpolator.interpolate(privates(this).rawProgress);
        },

        get currentTime() {
            return Date.now() - privates(this).startTime;
        },

        tick() {
            if (this.state === AnimationState.running) {
                /* The callback execution is placed inside if-else code blocks to guarantee 
                 * that it's called with raw progress being 1 on animation end even
                 * on millisecond precision scenarios. */

                if (privates(this).rawProgress < 1) {
                    /* Not reached iteration end. */
                    this.callback(this.getValue(privates(this).progress));
                    privates(this).tickHandler = requestAnimationFrame(privates(this).tick);
                } else {
                    /* Reached iteration end. */
                    this.callback(this.getValue(privates(this).progress));

                    if (privates(this).currentIteration < Math.floor(this.iterations)) {
                        privates(this).currentIteration++;
                        privates(this).startTime = Date.now();
                        privates(this).tickHandler = requestAnimationFrame(privates(this).tick);
                    } else {
                        this.stop();

                        if (typeof(this.endCallback) === "function") {
                            this.endCallback();
                        }
                    }
                }
            }
        }
    };
});

/**
 * Class used for animating things.
 * @abstract
 * @mixin
 */
export class Animator extends Abstract {
    /**
     * @param {Animator~properties} props - Animator properties.
     * 
     */
    constructor(props) {
        super();
        privates.setup(this);
        properties.apply(this, props);
    }

    /**
     * Current animator state.
     * @type {AnimationState}
     */
    get state() {
        return privates(this).state;
    }

    /**
     * Function that will be called by the animator on each frame.
     * @type {function}
     */
    get callback() {
        return privates(this).props.callback;
    }

    set callback(val) {
        if (this.state !== AnimationState.running && this.state !== AnimationState.paused) {
            if (typeof(val) !== "function") {
                throw new Error("Animation callback must be a function");
            }

            privates(this).props.callback = val;
        } else {
            throw new Error("Animator properties can only be changed if it's stopped");
        }
    }

    /**
     * Function that will be called when animation ends.
     * @type {?function}
     */
    get endCallback() {
        return privates(this).props.endCallback;
    }

    set endCallback(val) {
        if (this.state !== AnimationState.running && this.state !== AnimationState.paused) {
            if (typeof(val) !== "function" && val != null) {
                throw new Error("Animation end callback must be a function or a nullish value");
            }

            privates(this).props.endCallback = val;
        } else {
            throw new Error("Animator properties can only be changed if it's stopped");
        }
    }

    /**
     * Duration in milliseconds.
     * @type {number}
     */
    get duration() {
        return privates(this).props.duration;
    }

    set duration(val) {
        if (this.state !== AnimationState.running && this.state !== AnimationState.paused) {
            if (!isFinite(val) || val < 0) {
                throw new Error("Duration must be a finite positive number");
            }

            privates(this).props.duration = val;
        } else {
            throw new Error("Animator properties can only be changed if it's stopped");
        }
    }

    /**
     * Delay between call to start() method and effective animation start in milliseconds.
     * @type {number}
     */
    get delay() {
        return privates(this).props.delay;
    }

    set delay(val) {
        if (this.state !== AnimationState.running && this.state !== AnimationState.paused) {
            if (!isFinite(val) || val < 0) {
                throw new Error("Delay must be a finite positive number");
            }

            privates(this).props.delay = val;
        } else {
            throw new Error("Animator properties can only be changed if it's stopped");
        }
    }

    /**
     * Number indicating how many times this animation will be repeated.
     * @type {number}
     */
    get iterations() {
        return privates(this).props.iterations;
    }

    set iterations(val) {
        if (this.state !== AnimationState.running && this.state !== AnimationState.paused) {
            if (typeof(val) !== "number" && !(val instanceof Number) || val < 1) {
                throw new Error("Iterations must be a number above or equal to 1");
            }

            privates(this).props.iterations = val;
        } else {
            throw new Error("Animator properties can only be changed if it's stopped");
        }
    }

    /**
     * Animation progress interpolator.
     * @type {Interpolator}
     */
    get interpolator() {
        return privates(this).props.interpolator;
    }

    set interpolator(val) {
        if (this.state !== AnimationState.running && this.state !== AnimationState.paused) {
            if (!(val instanceof Interpolator)) {
                throw new Error("Interpolator must be of Interpolator class");
            }

            privates(this).props.interpolator = val;
        } else {
            throw new Error("Animator properties can only be changed if it's stopped");
        }
    }

    /**
     * Returns animated value based on animation progress.
     * @param {number} progress - Animation progress in range [0, 1].
     */
    getValue(progress) {
        throw new Error("Not implemented");
    }

    /**
     * Start the animation.
     */
    start() {
        if (this.state === AnimationState.stopped) {
            privates(this).state = AnimationState.running;
            privates(this).currentIteration = 1;
            privates(this).startTime = Date.now();
            privates(this).tickHandler = requestAnimationFrame(privates(this).tick);
        } else {
            throw new Error("Can only start animator if it's in stopped state");
        }
    }

    /**
     * Stop the animation.
     */
    stop() {
        cancelAnimationFrame(privates(this).tickHandler);
        privates(this).state = AnimationState.stopped;
    }

    /**
     * Pause the animation.
     */
    pause() {
        if (this.state === AnimationState.running) {
            cancelAnimationFrame(privates(this).tickHandler);
            privates(this).state = AnimationState.paused;
            privates(this).pausedProgress = privates(this).rawProgress;
        } else {
            throw new Error("Can only pause animator if it's in running state");
        }
    }

    /**
     * Resume the animation.
     */
    resume() {
        if (this.state === AnimationState.paused) {
            privates(this).state = AnimationState.running;
            privates(this).startTime = Date.now() - privates(this).pausedProgress * this.duration;
            privates(this).tickHandler = requestAnimationFrame(privates(this).tick);
        } else {
            throw new Error("Can only resume animator if it's in paused state");
        }
    }
}

/**
 * Enumerated values that indicates the state of an animation.
 * @hideconstructor
 * @abstract
 */
export class AnimationState extends Enum {
    /** 
     * Animation is stopped.
     * @type {string}
     */
    static get stopped() { return "stopped"; }

    /** 
     * Animation is running.
     * @type {string}
     */
    static get running() { return "running"; }

    /** 
     * Animation is paused.
     * @type {string}
     */
    static get paused() { return "paused"; }
};

/**
 * @typedef {object} Animator~properties
 * @prop {function} callback - Function that will be called by the animator on each frame.
 * @prop {number} [duration = 0] - Duration in milliseconds.
 * @prop {number} [delay = 0] - Delay between call to start() method and effective animation start in milliseconds.
 * @prop {number} [iterations = 1] - Number indicating how many times this animation will be repeated
 * @prop {Interpolator} [interpolator = new LinearInterpolator()] - Animation progress interpolator.
 * @prop {function} [endCallback] - Function that will be called when animation ends.
 */