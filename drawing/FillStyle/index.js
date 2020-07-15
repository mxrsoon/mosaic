import { Style, Color } from "#mosaic/drawing/index.js";

/**
 * Draw style that applies a fill color to paths being drawn.
 */
export class FillStyle extends Style {
	/**
	 * @param {Color} color - Fill color.
	 */
	constructor(color) {
		super();
		this.color = color;
	}

	/**
	 * Apply the style to the drawing context of a canvas.
	 * @param {object} props - Drawing context where the style needs to be applied.
	 * @param {Canvas} canvas - Canvas that owns the drawing context.
	 */
	apply(props, canvas) {
        if (this.color instanceof Color) {
			props.fillStyle = this.color.toHex();
        }
	}
}