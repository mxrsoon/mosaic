import { Canvas } from "../canvas/index.js";
import { Abstract } from "../../utils/index.js";

/**
 * Represents a drawing style that can be applied to a canvas draw instruction.
 * @abstract
 */
export class Style extends Abstract {
	/**
	 * Apply the style to the drawing context of a canvas.
	 * @param {object} props - Drawing context where the style needs to be applied.
	 * @param {Canvas} canvas - Canvas that owns the drawing context.
	 */
	apply(props, canvas) {
		throw new Error("Not implemented");
	}
}