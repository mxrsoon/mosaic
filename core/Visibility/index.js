import { Enum } from "../../utils/index.js";

/**
 * Enumerated values that indicates visibility state.
 * @hideconstructor
 * @abstract
 */
export class Visibility extends Enum {
    /** 
     * Visible.
     * @type {string}
     */
    static get visible() { return "visible"; }

    /** 
     * Invisible but interactive and measurable.
     * @type {string}
     */
    static get hidden() { return "hidden"; }

    /** 
     * Invisible and not interactive nor measurable.
     * @type {string}
     */
    static get gone() { return "gone"; }
};