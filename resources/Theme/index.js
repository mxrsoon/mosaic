import { PrivateFields } from "../../utils/index.js";
import { Color } from "../../drawing/index.js";
import { ThemeColor } from "../index.js";

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

    getColor(colorName) {
        if (privates(this).colors[colorName] instanceof Color) {
            return privates(this).colors[colorName];
        }
    }
}