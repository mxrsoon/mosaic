import { Static } from "../../utils/index.js";
import { Viewport } from "../core/index.js";

/**
 * Contains information about the current platform and associated managers.
 */
export class Platform extends Static {
    /**
     * Short name of the current platform.
     * @type {string}
     */
    static get name() {
        throw new Error("Not implemented");
    }

    /**
     * The viewport manager for the current platform.
     * @type {Viewport}
     */
    static get viewport() {
        throw new Error("Not implemented");
    }
}