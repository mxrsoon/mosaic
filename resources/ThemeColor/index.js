import { PrivateFields } from "@mosaic/utils/index.js";
import { Color } from "@mosaic/drawing/index.js";
import { Application } from "@mosaic/core/index.js";

/* Private fields for ThemeColor class */
const privates = new PrivateFields(function(name, defColor) {
    return {
        colorName: name,
        defaultColor: defColor,

        get theme() {
            try {
                return Application.current.theme;
            } catch {
                return undefined;
            }
        },

        get color() {
            try {
                return privates(this).theme.getColor(privates(this).colorName) || privates(this).defaultColor;
            } catch {
                return privates(this).defaultColor;
            }
        }
    };
});

export class ThemeColor extends Color {
	constructor(colorName, defaultColor = Color.transparent) {
        super(defaultColor.toHsv().h, defaultColor.toHsv().s, defaultColor.toHsv().v, defaultColor.toHsv().a);
        privates.setup(this, colorName, defaultColor);

        if (!(defaultColor instanceof Color)) {
            throw new Error("Argument 'defaultColor' must be of type Color");
        }
    }

	toHsv() {
		return privates(this).color.toHsv();
	}

	toRgb() {
		return privates(this).color.toRgb();
	}

	toHex() {
		return privates(this).color.toHex();
	}

	valueOf() {
		return privates(this).color.valueOf();
	}

	toString() {
		return privates(this).color.toString();
	}
}