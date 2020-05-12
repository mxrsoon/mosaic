import { PropertySet } from "../../utils/index.js";
import { Length } from "../../layout/index.js";
import { Widget } from "../../core/index.js";
import { ThemeColor } from "../../resources/index.js";
import { FillStyle, Color, Style } from "../../drawing/index.js";

/* Default properties for Text class. */
const properties = new PropertySet(function() {
    return {
        text: "",
        fontSize: new Length(16),
        fontFamily: "Segoe UI, Roboto, sans-serif",
        color: new ThemeColor("text", Color.fromHex("#000000d0"))
    };
});

export class Text extends Widget {
    constructor(props) {
        super(props);
        properties.apply(this, props);
    }

    get text() {
        return this.$.props.text;
    }

    set text(val) {
        this.$.props.text = val;
        this.invalidate();
    }

    get fontSize() {
        return this.$.props.fontSize;
    }

    set fontSize(val) {
        this.$.props.fontSize = val;
        this.invalidate();
    }

    get fontFamily() {
        return this.$.props.fontFamily;
    }

    set fontFamily(val) {
        this.$.props.fontFamily = val;
        this.invalidate();
    }

    draw(canvas) {
        canvas.drawText(this.text, this.x, this.y, [
            new FillStyle(this.color),

            new (class extends Style {
                constructor(widget) {
                    super();
                    this.widget = widget;
                }

                apply(props, canvas) {
                    props.font = `${this.widget.fontSize}px ${this.widget.fontFamily}`;
                }
            })(this)
        ]);
    }
}