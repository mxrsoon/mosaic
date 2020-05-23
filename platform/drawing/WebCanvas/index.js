import { PrivateFields } from "../../../utils/index.js";
import { Canvas, Style } from "../../../drawing/index.js";
import { PropertySet } from "../../../utils/index.js";

/* Default properties for WebCanvas class. */
const properties = new PropertySet(function() {
	return {
        internalCanvas: new OffscreenCanvas(0, 0),
        height: privates(this).internalCanvas ? privates(this).internalCanvas.height : 0,
        width: privates(this).internalCanvas ? privates(this).internalCanvas.width : 0,
        scaleFactor: 1,
        resizable: false,
        scalable: false
	};
});

/* Private fields for WebCanvas class. */
const privates = new PrivateFields(function(props = {}) {
	return {
        context: undefined,
        
        get props() {
            return props;
        }
	};
});

/**
 * Canvas for drawing paths, shapes, text and images.
 */
export class WebCanvas extends Canvas {
	constructor(props) {
        super();
        privates.setup(this);
        props = properties.merge(this, props);

		privates(this).internalCanvas = props.internalCanvas;
        privates(this).internalCanvas.style.imageRendering = "pixelated";
		privates(this).context = privates(this).internalCanvas.getContext("2d");
        privates(this).context.imageSmoothingEnabled = false;

        privates(this).props.resizable = true;
        privates(this).props.scalable = true;
        
        properties.apply(this, props, ["width", "height"]);

        privates(this).props.resizable = props.resizable;
        privates(this).props.scalable = props.scalable;
	}

	get width() {
		return privates(this).internalCanvas.width;
	}

	set width(val) {
        if (this.resizable) {
            privates(this).internalCanvas.width = val;
        } else {
            throw new Error("This canvas is not resizable");
        }
	}
	
	get height() {
		return privates(this).internalCanvas.height;
	}
    
	set height(val) {
        if (this.resizable) {
            privates(this).internalCanvas.height = val;
        } else {
            throw new Error("This canvas is not resizable");
        }
    }
    
	get scaleFactor() {
		return privates(this).props.scaleFactor;
	}

	set scaleFactor(val) {
        if (this.scalable) {
            privates(this).props.scaleFactor = val;
            privates(this).context.setTransform(this.scaleFactor, 0, 0, this.scaleFactor, 0, 0);
        } else {
            throw new Error("This canvas is not scalable");
        }
	}
    
    get resizable() {
        return privates(this).props.resizable;
    }

    get scalable() {
        return privates(this).props.scalable;
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
		const ctx = privates(this).context;
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
		const ctx = privates(this).context;
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
		if (image instanceof Canvas) {
			image = privates(image).internalCanvas;
		}
		
		if (arguments.length === 3 || arguments.length === 5) {
			privates(this).context.drawImage(image, destX, destY, destWidth, destHeight);
		} else if (arguments.length === 7 || arguments.length === 9) {
			privates(this).context.drawImage(image, srcX, srcY, srcWidth, srcHeight, destX, destY, destWidth, destHeight);
		} else {
			throw new Error("Invalid call to drawImage, it must be called with 3, 5, 7 or 9 arguments")
		}
	}

	drawText(text, x, y, styles) {
		const ctx = privates(this).context;
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
		privates(this).context.clearRect(0, 0, this.width, this.height);
	}
}