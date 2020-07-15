import { Enum } from "#mosaic/utils/index.js";

/**
 * Enumerated values for path-filling rules.
 * @hideconstructor
 * @abstract
 */
export class FillRule extends Enum {
    /** 
     * The non-zero winding rule.
     * @type {string}
     */
    static get nonZero() { return "nonzero"; }

    /** 
     * The even-odd winding rule.
     * @type {string}
     */
    static get evenOdd() { return "evenodd"; }
};