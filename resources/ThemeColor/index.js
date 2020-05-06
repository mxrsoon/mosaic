import { PrivateFields } from "../../utils/index.js";
import { Color } from "../../drawing/index.js";
import { Theme } from "../index.js";

/* Private fields for ThemeColor class */
const privates = new PrivateFields(function(context, name, defColor) {
    return {
        context: context,
        colorName: name,
        defaultColor: defColor,

        get theme() {
            try {
                if (this.$.context instanceof Theme) {
                    return this.$.context;
                }

                return this.$.context.application.theme;
            } catch {
                return undefined;
            }
        },

        get color() {
            try {
                return this.$.theme.getColor(this.$.colorName) || this.$.defaultColor;
            } catch {
                return this.$.defaultColor;
            }
        }
    };
});

export class ThemeColor extends Color {
	constructor(context, colorName, defaultColor = Color.transparent) {
        super(defaultColor.toHsv().h, defaultColor.toHsv().s, defaultColor.toHsv().v, defaultColor.toHsv().a);
        privates.apply(this, context, colorName, defaultColor);

        if (!(defaultColor instanceof Color)) {
            throw new Error("Argument 'defaultColor' must be of type Color");
        }
    }

	toHsv() {
		return this.$.color.toHsv();
	}

	toRgb() {
		return this.$.color.toRgb();
	}

	toHex() {
		return this.$.color.toHex();
	}

	valueOf() {
		return this.$.color.valueOf();
	}

	toString() {
		return this.$.color.toString();
	}
}