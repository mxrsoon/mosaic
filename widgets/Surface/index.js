import { Widget, Visibility } from "../../core/index.js";
import { Color, FillStyle, ShadowStyle, StrokeStyle, Shape, RectangleShape } from "../../drawing/index.js";
import { PropertySet } from "../../utils/index.js";

/* Default properties for Surface class. */
const properties = new PropertySet(function() {
	return {
		background: Color.transparent,
		shadow: undefined,
		stroke: undefined,
		shape: new RectangleShape()
	};
});

/**
 * @class
 * Represents a surface-like widget that have shape and colors.
 */
export class Surface extends Widget {
    /**
     * @param {Surface~properties} props - Initial properties. 
     */
	constructor(props) {
		super(props);
		properties.apply(this, props);
	}

    /**
     * Surface background fill style.
     * @type {FillStyle}
     */
	get background() {
		return this.$.props.background;
	}

	set background(val) {
        if (val instanceof Color) {
            val = new FillStyle(val);
        } else if (!(val instanceof FillStyle)) {
            throw new Error("Background must be set to a FillStyle or a Color that will be converted to a FillStyle");
        }

        this.$.props.background = val;
        this.invalidate();
	}

    /**
     * Surface shadow style.
     * @type {?ShadowStyle}
     */
	get shadow() {
        return this.$.props.shadow;
	}

	set shadow(val) {
        if (!(val instanceof ShadowStyle) && val != null) {
			throw new Error("Shadow must be a ShadowStyle or a nullish value");
        }
        
		this.$.props.shadow = val;
		this.invalidate();
	}
    
    /**
     * Surface stroke style.
     * @type {?StrokeStyle}
     */
	get stroke() {
		return this.$.props.stroke;
	}

	set stroke(val) {
		if (!(val instanceof StrokeStyle) && val != null) {
			throw new Error("Stroke must be a StrokeStyle or a nullish value");
		}

		this.$.props.stroke = val;
		this.invalidate();
	}

    /**
     * Shape of the surface.
     * @type {Shape}
     */
	get shape() {
		return this.$.props.shape;
	}

	set shape(val) {
		if (!(val instanceof Shape)) {
			throw new Error("Shape must be of Shape class");
		}

		this.$.props.shape = val;
		this.invalidate();
	}

	hitTest(x, y) {
		return this.hitTestEnabled && this.visibility !== Visibility.gone
			&& this.shape.hitTest(this.width, this.height, x - this.x, y - this.y, this.stroke?.thickness);
	}

	draw(canvas) {
		canvas.drawShape(this.x, this.y, this.width, this.height, this.shape, [
			this.background,
			this.shadow
		]);
		
		canvas.drawShape(this.x, this.y, this.width, this.height, this.shape, [
			this.stroke
		]);
	}
}

/**
 * @typedef {object} Surface~properties
 * @prop {FillStyle|Color} [background = Color.transparent] - Surface background fill style.
 * @prop {?ShadowStyle} [shadow = undefined] - Surface shadow style.
 * @prop {?StrokeStyle} [stroke = undefined] - Surface stroke style.
 * @prop {Shape} [shape = new RectangleShape()] - Shape of the surface.
 */