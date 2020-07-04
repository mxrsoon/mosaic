import { Shape } from "../index.js";
import { PrivateFields } from "../../utils/index.js";

/* Private fields for StarShape class. */
const privates = new PrivateFields(function() {
    return {
        spikes: undefined
    };
});

/**
 * Represents a star shape that can be drawn.
 */
export class StarShape extends Shape {
	constructor(spikes = 5) {
        super();
        privates.setup(this);
        this.spikes = spikes;
    }

    get spikes() {
        return privates(this).spikes;
    }

    set spikes(val) {
        privates(this).spikes = val;
        this.onChange.invoke();
    }
	
	getPath(width, height) {
        const path = new Path2D();
        const outerRadius = Math.min(width, height) / 2;
        const cx = outerRadius;
        const cy = outerRadius;
        const innerRadius = outerRadius / 2;
        const spikes = this.spikes;

		var rot = Math.PI / 2 * 3;
        var x = cx;
        var y = cy;
        var step = Math.PI / spikes;

        path.moveTo(cx , cy - outerRadius);
        
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            path.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            path.lineTo(x, y);
            rot += step;
        }

        path.lineTo(cx, cy - outerRadius);
        path.closePath();

		return path;
    }
}