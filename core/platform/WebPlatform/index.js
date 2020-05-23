import { WebViewport } from "../../viewport/index.js";
import { PrivateFields } from "../../../utils/index.js";
import { Platform } from "../index.js";
import { WebCanvas } from "../../../drawing/canvas/index.js";

/* Private fields for WebPlatform class. */
const privates = new PrivateFields(function() {
    return {
        viewport: undefined
    };
});

/**
 * Contains information about the current web platform and associated managers.
 */
export class WebPlatform extends Platform {
    constructor() {
        super();
        privates.setup(this);
    }
    
    /**
     * Navigator user-agent string.
     * @type {string}
     */
    get userAgent() {
        return navigator.userAgent;
    }

    get name() {
        return "web";
    }

    get viewport() {
        return privates(this).viewport;
    }

    createCanvas(props) {
        return new WebCanvas(props);
    }

    initialize() {
        privates(this).viewport = new WebViewport(this);
    }

    static isCurrentPlatform() {
        return new Function("try { return this === window; } catch (e) { return false; }")();
    }
}