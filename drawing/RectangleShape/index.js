import { Shape, CornerRadius } from "@mosaic/drawing/index.js";
import { PrivateFields } from "@mosaic/utils/index.js";

/* Private fields for RectangleShape class. */
const privates = new PrivateFields(function() {
    return {
        cornerRadius: undefined
    };
});

/**
 * Represents a rectangular shape that can be drawn.
 */
export class RectangleShape extends Shape {
	constructor(cornerRadius = new CornerRadius(0)) {
        super();
        privates.setup(this);

        this.cornerRadius = cornerRadius;
    }
    
    /**
     * Rectangle corners' radiuses.
     * @type {CornerRadius}
     */
	get cornerRadius() {
		return privates(this).cornerRadius;
	}

	set cornerRadius(val) {
		if (!(val instanceof CornerRadius)) {
			throw new Error("Corner radius must be of CornerRadius class");
		}

		const currentValue = privates(this).cornerRadius;

		if (currentValue) {
			currentValue.onChange.remove(this.onChange);
		}
		
		privates(this).cornerRadius = val;
		val.onChange.add(this.onChange);
		this.onChange.invoke();
	}
	
	getPath(width, height) {
		const path = new Path2D();

		if (this.cornerRadius.isSharp) {
			path.rect(0, 0, width, height);
		} else {
			let tl0 = this.cornerRadius.topLeft,
				tr0 = this.cornerRadius.topRight,
				br0 = this.cornerRadius.bottomRight,
				bl0 = this.cornerRadius.bottomLeft,
				tlX = tl0,
				trX = tr0,
				brX = br0,
				blX = bl0,
				tlY = tl0,
				trY = tr0,
				brY = br0,
				blY = bl0;
			
			/* Limit top-left radius. */
			tlX -= Math.max(tl0 / (tl0 + tr0) * (tl0 + tr0 - width) || 0, 0);
			tlY -= Math.max(tl0 / (tl0 + bl0) * (tl0 + bl0 - height) || 0, 0);

			/* Limit top-right radius. */
			trX -= Math.max(tr0 / (tr0 + tl0) * (tr0 + tl0 - width) || 0, 0);
			trY -= Math.max(tr0 / (tr0 + br0) * (tr0 + br0 - height) || 0, 0);

			/* Limit bottom-right radius. */
			brX -= Math.max(br0 / (br0 + bl0) * (br0 + bl0 - width) || 0, 0);
			brY -= Math.max(br0 / (br0 + tr0) * (br0 + tr0 - height) || 0, 0);
			
			/* Limit bottom-left radius. */
			blX -= Math.max(bl0 / (bl0 + br0) * (bl0 + br0 - width) || 0, 0);
			blY -= Math.max(bl0 / (bl0 + tl0) * (bl0 + tl0 - height) || 0, 0);
			
			/* Top-right corner. */
			path.ellipse(width - trX, trY, trX, trY, 0, Math.PI * 1.5, 0);
			path.lineTo(width, height - brY);

			/* Bottom-right corner. */
			path.ellipse(width - brX, height - brY, brX, brY, 0, 0, Math.PI / 2);
			path.lineTo(blX, height);
			
			/* Bottom-left corner. */
			path.ellipse(blX, height - blY, blX, blY, 0, Math.PI / 2, Math.PI);
			path.lineTo(0, tlY);
			
			/* Top-left corner. */
			path.ellipse(tlX, tlY, tlX, tlY, 0, Math.PI, Math.PI * 1.5);
			path.lineTo(width - trX, 0);

			path.closePath();
		}

		return path;
	}
}