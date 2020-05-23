import { Abstract, PrivateFields, HandlerList } from "../../../utils/index.js";
import { Canvas } from "../../../drawing/canvas/index.js";
import { Platform } from "../../platform/index.js";

/* Private fields for Viewport class. */
const privates = new PrivateFields(function() {
    return {
        events: {
            onResize: new HandlerList()
        }
    };
});

/**
 * A class to represent application viewports.
 */
export class Viewport extends Abstract {
    /**
     * @param {Platform} platform - The current platform.
     */
    constructor(platform) {
        super();
        privates.setup(this);

        if (Platform.current == null) {
            throw new Error("Platform not initialized");
        }

        if (Platform.current !== platform) {
            throw new Error("Platform reference is not to current platform")
        }

        if (platform.viewport instanceof Viewport) {
            throw new Error("Platform already has a viewport manager");
        }
    }

    /**
     * Viewport resize event handlers.
     * @type {HandlerList}
     */
    get onResize() {
        return privates(this).events.onResize;
    }

    /**
     * Width of the viewport.
     * @type {number}
     */
    get width() {
        throw new Error("Not implemented");
    }

    /**
     * Height of the viewport.
     * @type {number}
     */
    get height() {
        throw new Error("Not implemented");
    }

    /**
     * Current viewport scale factor.
     * @type {number}
     */
    get scaleFactor() {
        throw new Error("Not implemented");
    }

    /**
     * A canvas for drawing on the current viewport.
     * @type {Canvas}
     */
    get canvas() {
        throw new Error("Not implemented");
    }
}