import { FillRule } from "@mosaic/drawing/index.js";
import { Length } from "@mosaic/layout/index.js";
import { Abstract, PrivateFields, EventHandlerList } from "@mosaic/utils/index.js";

/* Static private hit testing context */
const hitTestingContext = new OffscreenCanvas(0, 0).getContext("2d");

/* Private fields for Shape class */
const privates = new PrivateFields(function() {
    return {
        events: {
            onChange: new EventHandlerList()
        }
    };
});

/**
 * Represents a shape that can be drawn.
 * @abstract
 */
export class Shape extends Abstract {
	constructor() {
		super();
		privates.setup(this);
	}

	/** @type {EventHandlerList} */
    get onChange() {
        return privates(this).events.onChange;
    }

    set onChange(val) {
        throw new Error("Event handler lists are readonly, use the 'add(handler)' function");
	}
	
	/**
	 * Returns a path object for the shape in the desired dimensions.
	 * @param {number} width - Desired width of the shape.
	 * @param {number} height - Desired height of the shape.
	 */
	getPath(width, height) {
		throw new Error("Not implemented");
	}

	/**
	 * Check whether or not the specified point is contained in the shape at the specified size.
	 * @param {number} shapeWidth - Desired width to apply to the shape for hit testing.
	 * @param {number} shapeHeight - Desired width to apply to the shape for hit testing.
	 * @param {number} hitX - The x-axis coordinate of the point to check. 0 is the left-most coordinated of the shape canvas.
	 * @param {number} hitY - The y-axis coordinate of the point to check. 0 is the top-most coordinated of the shape canvas.
	 * @param {number|Length} [strokeWidth] - Width of the line to stroke the shape for hit testing.
	 * @param {FillRule} fillRule - The algorithm by which to determine if a point is inside or outside the shape.
	 * @returns {boolean} A boolean that indicates if the specified point is contained in the shape.
	 */
	hitTest(shapeWidth, shapeHeight, hitX, hitY, strokeWidth = 0, fillRule = FillRule.nonZero) {
		return Shape.hitTest(this, shapeWidth, shapeHeight, hitX, hitY, strokeWidth, fillRule)
	}

	/**
	 * Check whether or not the specified point is contained in the given shape at the specified size.
	 * @param {Shape} shape - A shape to check against.
	 * @param {number} shapeWidth - Desired width to apply to the shape for hit testing.
	 * @param {number} shapeHeight - Desired width to apply to the shape for hit testing.
	 * @param {number} hitX - The x-axis coordinate of the point to check. 0 is the left-most coordinated of the shape canvas.
	 * @param {number} hitY - The y-axis coordinate of the point to check. 0 is the top-most coordinated of the shape canvas.
	 * @param {number|Length} [strokeWidth] - Width of the line to stroke the shape for hit testing.
	 * @param {FillRule} [fillRule] - The algorithm by which to determine if a point is inside or outside the shape.
	 * @returns {boolean} A boolean that indicates if the specified point is contained in the specified shape.
	 */
	static hitTest(shape, shapeWidth, shapeHeight, hitX, hitY, strokeWidth = 0, fillRule = FillRule.nonZero) {
		hitTestingContext.canvas.width = shapeWidth + strokeWidth;
		hitTestingContext.canvas.height = shapeHeight + strokeWidth;

		if (strokeWidth > 0) {
			const path = shape.getPath(shapeWidth, shapeHeight);

			hitTestingContext.lineWidth = strokeWidth;
			const strokeHit = hitTestingContext.isPointInStroke(path, hitX, hitY);
			hitTestingContext.lineWidth = 1;

			return hitTestingContext.isPointInPath(path, hitX, hitY, fillRule) || strokeHit;
		} else {
			return hitTestingContext.isPointInPath(shape.getPath(shapeWidth, shapeHeight), hitX, hitY, fillRule);
		}
	}
}