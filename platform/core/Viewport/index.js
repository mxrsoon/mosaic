import { EventHandlerList, Static } from "../../../utils/index.js";
import { Canvas } from "../../drawing/Canvas/index.js";

/**
 * A class to represent application viewports.
 */
export class Viewport extends Static {
    /**
     * Viewport resize event handlers.
     * @type {EventHandlerList}
     */
    static get onResize() {
        throw new Error("Not implemented");
    }

    /**
     * Width of the viewport.
     * @type {number}
     */
    static get width() {
        throw new Error("Not implemented");
    }

    /**
     * Height of the viewport.
     * @type {number}
     */
    static get height() {
        throw new Error("Not implemented");
    }

    /**
     * Current viewport scale factor.
     * @type {number}
     */
    static get scaleFactor() {
        throw new Error("Not implemented");
    }

    /**
     * A canvas for drawing on the current viewport.
     * @type {Canvas}
     */
    static get canvas() {
        throw new Error("Not implemented");
    }
}