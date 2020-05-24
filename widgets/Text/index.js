import { PropertySet, PrivateFields } from "../../utils/index.js";
import { Length, Padding } from "../../layout/index.js";
import { Widget } from "../../core/index.js";
import { ThemeColor } from "../../resources/index.js";
import { FillStyle, Color, Style } from "../../drawing/index.js";
import { TextOptions } from "../../drawing/text/index.js";

/* Default properties for Text class. */
const properties = new PropertySet(function() {
    return {
        textOptions: new TextOptions({
            fontSize: new Length(16),
            fontName: "Segoe UI, Roboto, sans-serif"
        }),
        
        fontSize: undefined,
        fontName: undefined,

        text: "",
        color: new ThemeColor("text", Color.fromHex("#000000d0"))
    };
});

/* Private fields for Text class */
const privates = new PrivateFields(function(props = {}) {
    return {
        get props() {
            return props;
        }
    };
});

export class Text extends Widget {
    constructor(props) {
        super(props);
        privates.setup(this);
        properties.apply(this, props);
    }

    get text() {
        return privates(this).props.text;
    }

    set text(val) {
        privates(this).props.text = val;
        this.invalidate();
    }

    get textOptions() {
        return privates(this).props.textOptions;
    }

    set textOptions(val) {
        if (typeof(val) !== "object") {
            throw new Error("Text options must be of TextOptions class or a TextOptions initializer object");
        }

        if (!(val instanceof TextOptions)) {
            val = new TextOptions(val);
        }

        privates(this).props.textOptions = val;
        this.invalidate();

        // TODO: Add TextOptions onChange listener to invalidate the widget.
    }

    get fontSize() {
        return privates(this).props.textOptions.fontSize;
    }

    set fontSize(val) {
        privates(this).props.textOptions.fontSize = val;
    }

    get fontName() {
        return privates(this).props.textOptions.fontName;
    }

    set fontName(val) {
        privates(this).props.textOptions.fontName = val;
    }

    draw(canvas) {
        canvas.drawTextBlock(
            this.text,
            this.x + this.padding.left,
            this.y + this.padding.top,
            this.width - this.padding.left - this.padding.right,
            this.height - this.padding.top - this.padding.bottom,
            this.textOptions,
            [new FillStyle(this.color)]
        );
    }
}