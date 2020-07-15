import { Length } from "@mosaic/layout/index.js";
import { PrivateFields } from "@mosaic/utils/index.js";
import { Viewport } from "@mosaic/platform/core";

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
        return privates(this).pixels / Viewport.scaleFactor;
    }
}