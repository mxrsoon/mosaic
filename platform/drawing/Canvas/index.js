import { Abstract } from "../../../utils/index.js";

/**
 * Canvas for drawing paths, shapes, text and images.
 */
export class Canvas extends Abstract {
	get width() {
		throw new Error("Not implemented");
	}
	
	get height() {
		throw new Error("Not implemented");
	}

	get scaleFactor() {
		throw new Error("Not implemented");
	}

	get resizable() {
		throw new Error("Not implemented");
	}

	get scalable() {
		throw new Error("Not implemented");
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
		throw new Error("Not implemented");
	}

	/**
	 * Draw a Shape object.
	 * @param {Shape} shape - Shape to be drawn.
	 * @param {number} x - The top left X coordinate.
	 * @param {number} y - The top left Y coordinate.
	 * @param {number} width - Desired width.
	 * @param {number} height - Desired height.
	 * @param {Style[]} styles - Styles to draw the shape with.
	 */
	drawShape(shape, x, y, width, height, styles) {
		throw new Error("Not implemented");
	}

	/**
	 * Draw an image.
	 * @param {(Canvas|ImageBitmap)} image - Image to be drawn. Can be any canvas image source or a Canvas object.
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
		throw new Error("Not implemented");
	}

	/**
     * Draw text using the passed options.
     * @param {string} text - Text to draw.
	 * @param {number} x - Text baseline left-most coordinate.
	 * @param {number} y - Text baseline top-most coordinate.
     * @param {TextOptions} textOptions - Text options used to draw.
	 * @param {Style[]} styles - Styles to draw the text with.
     */
	drawText(text, x, y, textOptions, styles) {
		throw new Error("Not implemented");
	}

	/**
     * Draw text using the passed options.
     * @param {string} text - Text to draw.
	 * @param {number} x - Text baseline left-most coordinate.
	 * @param {number} y - Text baseline top-most coordinate.
	 * @param {number} width - Text block width.
	 * @param {number} height - Text block height.
     * @param {TextOptions} textOptions - Text options used to draw.
	 * @param {Style[]} styles - Styles to draw the text with.
     */
	drawTextBlock(text, x, y, width, height, textOptions, styles) {
		throw new Error("Not implemented");
	}

	/**
     * Measure a text using the passed options.
     * @param {string} text - Text to measure.
     * @param {TextOptions} textOptions - Text to measure.
     * @returns {TextMetrics} Resulting metrics.
     */
	measureText(text, textOptions) {
		throw new Error("Not implemented");
	}

	/** Clear the entire canvas. */
	clear() {
		throw new Error("Not implemented");
	}
}