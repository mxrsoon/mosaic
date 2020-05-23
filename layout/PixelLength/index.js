import { Length } from "../index.js";
import { PrivateFields } from "../../utils/index.js";

/* Private fields for PixelLength class */
const privates = new PrivateFields(function(pixels) {
    return {
        pixels: pixels
    };
});

export class PixelLength extends Length {
    constructor(pixels) {
        super(0);
        privates.setup(this, pixels);
    }

    valueOf() {
        return privates(this).pixels / (window.devicePixelRatio || 1);
    }
}