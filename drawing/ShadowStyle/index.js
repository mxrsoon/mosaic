import { Style, Color } from "#mosaic/drawing/index.js";
import { PrivateFields } from "#mosaic/utils/index.js";

/* Private fields for ShadowStyle class. */
const privates = new PrivateFields(function() {
	return {
		offsetX: undefined,
		offsetY: undefined,
		blurAmount: undefined,
		color: undefined
	};
});

/**
 * Style for applying shadows on Canvas drawings.
 */
export class ShadowStyle extends Style {
	/**
	 * @param {number} offsetX - Horizontal offset.
	 * @param {number} offsetY - Vertical offset.
	 * @param {number} blurAmount - Blur amount.
	 * @param {Color} color - Shadow's color.
	 */
	constructor(offsetX, offsetY, blurAmount, color) {
		super();
		privates.setup(this);

		this.offsetX = offsetX;
		this.offsetY = offsetY;
		this.blurAmount = blurAmount;
		this.color = color;
	}

	/**
	 * Shadow's horizontal offset.
	 * @type {number}
	 */
	get offsetX() {
		return privates(this).offsetX;
	}

	set offsetX(val) {
		privates(this).offsetX = val;
	}

	/**
	 * Shadow's vertical offset.
	 * @type {number}
	 */
	get offsetY() {
		return privates(this).offsetY;
	}

	set offsetY(val) {
		privates(this).offsetY = val;
	}

	/**
	 * Shadow's blur amount.
	 * @type {number}
	 */
	get blurAmount() {
		return privates(this).blurAmount;
	}

	set blurAmount(val) {
		privates(this).blurAmount = val;
	}

	/**
	 * Shadow's color.
	 * @type {Color}
	 */
	get color() {
		return privates(this).color;
	}

	set color(val) {
		privates(this).color = val;
	}

	apply(props, canvas) {
		props.shadowOffsetX = this.offsetX * canvas.scaleFactor;
		props.shadowOffsetY = this.offsetY * canvas.scaleFactor;
		props.shadowBlur = this.blurAmount * canvas.scaleFactor;
		props.shadowColor = this.color.toHex();
	}
}