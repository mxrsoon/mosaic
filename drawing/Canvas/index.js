import { PrivateFields } from "../../utils/index.js";
import { Style } from "../index.js";

/* Private fields for Canvas class */
const privates = new PrivateFields(function() {
	return {
		webCanvas: undefined,
		context: undefined,
		scaleFactor: 1
	};
});

/**
 * Canvas for drawing paths, shapes, text and images.
 */
export class Canvas {
	constructor(webCanvas) {
		privates.apply(this);
		this.$.webCanvas = webCanvas;
		this.$.webCanvas.style.imageRendering = "pixelated";
		this.$.context = webCanvas.getContext("2d");
		this.$.context.imageSmoothingEnabled = false;
	}

	get width() {
		return this.$.webCanvas.width;
	}

	set width(val) {
		this.$.webCanvas.width = val;
	}
	
	get height() {
		return this.$.webCanvas.height;
	}

	set height(val) {
		this.$.webCanvas.height = val;
	}

	get scaleFactor() {
		return this.$.scaleFactor;
	}

	set scaleFactor(val) {
		this.$.scaleFactor = val;
		this.$.context.setTransform(this.scaleFactor, 0, 0, this.scaleFactor, 0, 0);
	}

	/**
	 * Draw a rectangle.
	 * @param {number} x - The top left X coordinate.
	 * @param {number} y - The top left Y coordinate.
	 * @param {number} width - Width of the rectangle.
	 * @param {number} height - Height of the rectangle.
	 * @param {Style[]} styles - Styles to draw the rectangle with.
	 */
	drawRect(x, y, width, height, styles) {
		const ctx = this.$.context;
		const props = {};

		ctx.save();

		for (let style of styles) {
			if (style instanceof Style) {
				style.apply(props, this);
			}
		}

		Object.assign(ctx, props);

		ctx.beginPath();
		ctx.rect(x, y, width, height);

		if (props.fillStyle) {
			ctx.fill();
		}

		if (props.strokeStyle) {
			ctx.stroke();
		}

		ctx.restore();
	}

	/**
	 * Draw a Shape object.
	 * @param {number} x - The top left X coordinate.
	 * @param {number} y - The top left Y coordinate.
	 * @param {number} width - Desired width.
	 * @param {number} height - Desired height.
	 * @param {Shape} shape - Shape to be drawn.
	 * @param {Style[]} styles - Styles to draw the shape with.
	 */
	drawShape(x, y, width, height, shape, styles) {
		const ctx = this.$.context;
		const path = shape.getPath(width, height);
		const props = {};

		ctx.save();

		for (let style of styles) {
			if (style instanceof Style) {
				style.apply(props, this);
			}
		}

		Object.assign(ctx, props);
		ctx.translate(x, y);

		if (props.fillStyle) {
			ctx.fill(path);
		}

		if (props.strokeStyle) {
			ctx.stroke(path);
		}

		ctx.restore();
	}

	/**
	 * Draw an image.
	 * @param {(Canvas|CanvasImageSource)} image - Image to be drawn. Can be any canvas image source or a Canvas object.
	 * @param {number} destX - The top left X coordinate in the destination canvas at which to place the top-left corner of the source image.
	 * @param {number} destY - The top left Y coordinate in the destination canvas at which to place the top-left corner of the source image.
	 * @param {?number} [destWidth] - The width to draw the image. This allows scaling of the drawn image. If not specified, the image is not scaled in width when drawn.
	 * @param {?number} [destHeight] - The height to draw the image. This allows scaling of the drawn image. If not specified, the image is not scaled in height when drawn. Required if destWidth is provided.
	 * @param {number} [srcX] - The top left X coordinate of the sub-rectangle of the source image to draw.
	 * @param {number} [srcY] - The top left Y coordinate of the sub-rectangle of the source image to draw. Required if srcX is provided.
	 * @param {?number} [srcWidth] - The width of the sub-rectangle of the source image to draw. If not specified, the entire rectangle from the specified top-left source coordinates is used.
	 * @param {?number} [srcHeight] - The height of the sub-rectangle of the source image to draw. If not specified, the entire rectangle from the specified top-left source coordinates is used. Required if srcWidth is provided.
	 */
	drawImage(image, destX, destY, destWidth, destHeight, srcX, srcY, srcWidth, srcHeight) {
		if (image instanceof Canvas) {
			image = image.$.webCanvas;
		}
		
		if (arguments.length === 3 || arguments.length === 5) {
			this.$.context.drawImage(image, destX, destY, destWidth, destHeight);
		} else if (arguments.length === 7 || arguments.length === 9) {
			this.$.context.drawImage(image, srcX, srcY, srcWidth, srcHeight, destX, destY, destWidth, destHeight);
		} else {
			throw new Error("Invalid call to drawImage, it must be called with 3, 5, 7 or 9 arguments")
		}
	}

	drawText(text, x, y, styles) {
		const ctx = this.$.context;
		const props = {};

		ctx.save();

		for (let style of styles) {
			if (style instanceof Style) {
				style.apply(props, this);
			}
		}

		Object.assign(ctx, props);

		if (props.fillStyle) {
			ctx.fillText(text, x, y);
		}

		if (props.strokeStyle) {
			ctx.strokeText(text, x, y);
		}

		ctx.restore();
	}

	/** Clear the entire canvas. */
	clear() {
		this.$.context.clearRect(0, 0, this.width, this.height);
	}
}