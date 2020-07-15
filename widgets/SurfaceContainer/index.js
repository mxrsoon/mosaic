import { Container, Visibility } from "#mosaic/core/index.js";
import { Color, FillStyle, ShadowStyle, StrokeStyle, Shape, RectangleShape } from "#mosaic/drawing/index.js";
import { PropertySet, PrivateFields } from "#mosaic/utils/index.js";

/* Default properties for SurfaceContainer class. */
const properties = new PropertySet(function() {
	return {
		background: Color.transparent,
		shadow: undefined,
		stroke: undefined,
		shape: new RectangleShape()
	};
});

/* Private fields for SurfaceContainer class */
const privates = new PrivateFields(function(props = {}) {
    return {
        get props() {
            return props;
        }
    };
});

/**
 * @class
 * Represents a surface-like container that have shape and colors.
 */
export class SurfaceContainer extends Container {
    /**
     * @param {SurfaceContainer~properties} props - Initial properties. 
     */
	constructor(props) {
		super(props);
		privates.setup(this);
		properties.apply(this, props);
	}

    /**
     * SurfaceContainer background fill style.
     * @type {FillStyle}
     */
	get background() {
		return privates(this).props.background;
	}

	set background(val) {
        if (val instanceof Color) {
            val = new FillStyle(val);
        } else if (!(val instanceof FillStyle)) {
            throw new Error("Background must be set to a FillStyle or a Color that will be converted to a FillStyle");
        }

        privates(this).props.background = val;
        this.invalidate();
	}

    /**
     * SurfaceContainer shadow style.
     * @type {?ShadowStyle}
     */
	get shadow() {
        return privates(this).props.shadow;
	}

	set shadow(val) {
        if (!(val instanceof ShadowStyle) && val != null) {
			throw new Error("Shadow must be a ShadowStyle or a nullish value");
        }
        
		privates(this).props.shadow = val;
		this.invalidate();
	}
    
    /**
     * SurfaceContainer stroke style.
     * @type {?StrokeStyle}
     */
	get stroke() {
		return privates(this).props.stroke;
	}

	set stroke(val) {
		if (!(val instanceof StrokeStyle) && val != null) {
			throw new Error("Stroke must be a StrokeStyle or a nullish value");
		}

		privates(this).props.stroke = val;
		this.invalidate();
	}

    /**
     * Shape of the surface.
     * @type {Shape}
     */
	get shape() {
		return privates(this).props.shape;
	}

	set shape(val) {
		if (!(val instanceof Shape)) {
			throw new Error("Shape must be of Shape class");
		}

		const currentValue = privates(this).props.shape;

		if (currentValue) {
			currentValue.onChange.remove(this.invalidate);
		}
		
		privates(this).props.shape = val;
		val.onChange.add(this.invalidate);
		this.invalidate();
	}

	hitTest(x, y) {
		return this.hitTestEnabled && this.visibility !== Visibility.gone
			&& this.shape.hitTest(this.width, this.height, x - this.x, y - this.y, this.stroke ? this.stroke.thickness : undefined);
	}

	draw(canvas) {
		canvas.drawShape(this.shape, this.x, this.y, this.width, this.height, [
			this.background,
			this.shadow
		]);
		
		canvas.drawShape(this.shape, this.x, this.y, this.width, this.height, [
			this.stroke
		]);

		super.draw(canvas);
	}
}

/**
 * @typedef {object} SurfaceContainer~properties
 * @prop {FillStyle|Color} [background = Color.transparent] - SurfaceContainer background fill style.
 * @prop {?ShadowStyle} [shadow = undefined] - SurfaceContainer shadow style.
 * @prop {?StrokeStyle} [stroke = undefined] - SurfaceContainer stroke style.
 * @prop {Shape} [shape = new RectangleShape()] - Shape of the surface.
 */