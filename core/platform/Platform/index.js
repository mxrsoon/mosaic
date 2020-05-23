import { Abstract } from "../../../utils/index.js";
import { WebPlatform } from "../index.js";
import { Viewport } from "../../viewport/index.js";

/* Block new instances of the class and changes to some properties. */
let lock = true;

/* Reference to the current platform. */
let currentPlatform;

/* Initialize current platform-specific implementation of Platform class. */
function initializeCurrentPlatform() {
    lock = false;

    if (WebPlatform.isCurrentPlatform()) {
        currentPlatform = new WebPlatform();
    }

    lock = true;

    currentPlatform.initialize();
}

/**
 * Contains information about the current platform and associated managers.
 */
export class Platform extends Abstract {
    constructor() {
        super();

        if (lock) {
            throw new Error("Unable to instantiate this class, use Platform.current to get a reference to the current platform");
        }
    }

    /**
     * Short name of the current platform.
     * @type {string}
     */
    get name() {
        throw new Error("Not implemented");
    }

    /**
     * The viewport manager for the platform.
     * @type {Viewport}
     */
    get viewport() {
        throw new Error("Not implemented");
    }

    /**
     * Instantiates the Canvas implementation for the platform.
     * @param {object} props - Canvas initial properties.
     * @returns {Canvas} Instance of the Canvas implementation for the platform.
     */
    createCanvas(props) {
        throw new Error("Not implemented");
    }
    
    /**
     * Initializes platform-related things.
     */
    initialize() {
        throw new Error("Not implemented");
    }

    /**
     * A Platform object for the current platform.
     * @type {Platform}
     */
    static get current() { 
        if (!currentPlatform) {
            initializeCurrentPlatform();
        }

        return currentPlatform;
    }

    static isCurrentPlatform() {
        throw new Error("Not implemented");
    }
}