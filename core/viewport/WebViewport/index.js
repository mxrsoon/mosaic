import { Viewport } from "../index.js";
import { WebPlatform } from "../../platform/index.js";
import { WebCanvas } from "../../../drawing/canvas/index.js";

let canvas;

function createCanvas() {
    const canvasElement = document.createElement("canvas");
    canvasElement.style.display = "block";
    canvasElement.style.position = "fixed";
    canvasElement.style.top = "0";
    canvasElement.style.right = "0";
    canvasElement.style.bottom = "0";
    canvasElement.style.left = "0";

    canvasElement.style.width = "100%";
    canvasElement.style.height = "100%";

    canvasElement.style.background = "transparent";
    canvasElement.style.overflow = "hidden";
    canvasElement.style.overscrollBehavior = "none";
    canvasElement.style.touchAction = "none";

    document.body.append(canvasElement);

    return new WebCanvas({
        internalCanvas: canvasElement,
        resizable: true,
        scalable: true
    });
}

/**
 * A class to represent application viewports on web-based platforms.
 */
export class WebViewport extends Viewport {
    /**
     * @param {Platform} platform - The current platform.
     */
    constructor(platform) {
        super(platform);

        if (!(platform instanceof WebPlatform)) {
            throw new Error("Platform must be a WebPlatform in the current context");
        }

        canvas = createCanvas();
        
        this.onResize.add((width, height) => {
            this.canvas.scaleFactor = this.scaleFactor;
            this.canvas.width = width;
            this.canvas.height = height;
        });

        window.addEventListener("resize", () => this.onResize.invoke(window.innerWidth, window.innerHeight));
    }

    /**
     * Width of the viewport.
     * @type {number}
     */
    get width() {
        return window.innerWidth;
    }

    /**
     * Height of the viewport.
     * @type {number}
     */
    get height() {
        return window.innerHeight;
    }

    /**
     * Current viewport scale factor.
     * @type {number}
     */
    get scaleFactor() {
        return window.devicePixelRatio;
    }

    /**
     * A canvas for drawing on the current viewport.
     * @type {WebCanvas}
     */
    get canvas() {
        return canvas;
    }
}