import { Style, Color } from "../index.js";

/**
 * Draw style that applies a fill color to paths being drawn.
 */
export class StrokeStyle extends Style {
	/**
	 * @param {Color} color - Stroke color.
	 * @param {number} thickness - Stroke thickness.
	 */
	constructor(color, thickness) {
		super();
		this.color = color;
		this.thickness = thickness;
	}

	/**
	 * Apply the style to the drawing context of a canvas.
	 * @param {object} props - Drawing context where the style needs to be applied.
	 * @param {Canvas} canvas - Canvas that owns the drawing context.
	 */
	apply(props, canvas) {
        if (this.color instanceof Color) {
            props.strokeStyle = this.color.toHex();
            props.lineWidth = this.thickness;
        }
	}
}