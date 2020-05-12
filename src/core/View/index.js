import { PropertySet } from "../../utils/index.js";
import { ThemeColor } from "../../resources/index.js";
import { Color, FillStyle } from "../../drawing/index.js";
import { Container } from "../index.js";

/* Default properties for Container class. */
const properties = new PropertySet(function() {
	return {
		background: new ThemeColor(this, "background", Color.transparent),
		width: "100%",
		height: "100%"
	};
});

/**
 * A View that contains Widgets.
 */
export class View extends Container {
	constructor(props) {
		super(props);
		properties.apply(this, props);
	}

	get background() {
		return this.$.props.background;
	}

	set background(val) {
		this.$.props.background = val;
		this.invalidate();
	}

	draw(canvas) {
		canvas.drawRect(this.x, this.y, this.width, this.height, [
			new FillStyle(this.background)
		]);
		
		super.draw(canvas);
	}
}