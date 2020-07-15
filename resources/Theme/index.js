import { PrivateFields } from "#mosaic/utils/index.js";
import { Color } from "#mosaic/drawing/index.js";
import { ThemeColor } from "#mosaic/resources/index.js";

/* Private fields for Theme class */
const privates = new PrivateFields(function() {
    return {
        colors: {}
    };
});

export class Theme {
    constructor({ colors = {} } = {}) {
        privates.setup(this);
        this.setColors(colors);
    }

    setColors(colors) {
        for (let k in colors) {
            this.setColor(k, colors[k]);
        }
    }

    setColor(colorName, color) {
        if (color instanceof Color) {
            privates(this).colors[colorName] = color;
        } else if (typeof(color) === "string") {
            privates(this).colors[colorName] = new ThemeColor(color, Color.transparent);
        } else if (color == null) {
            privates(this).colors[colorName] = undefined;
        }
    }

    /**
     * Gets a color from the theme by it's name.
     * @param {string} colorName - Color name.
     * @returns {?Color} Color whose key matches the given name.
     */
    getColor(colorName) {
        if (privates(this).colors[colorName] instanceof Color) {
            return privates(this).colors[colorName];
        }
    }
}