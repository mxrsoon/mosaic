import { Color, ShadowStyle, CornerRadius, RectangleShape } from "../../drawing/index.js";
import { ThemeColor } from "../../resources/index.js";
import { PropertySet } from "../../utils/index.js";
import { SurfaceContainer } from "../index.js";

/* Default properties for Card class. */
const properties = new PropertySet(function() {
	return {
		background: new ThemeColor("cardBackground", new ThemeColor("background", Color.white)),
		shadow: new ShadowStyle(0, 1, 5, Color.fromRgb(0, 0, 0, .25)),
		shape: new RectangleShape(new CornerRadius(4))
	};
});

export class Card extends SurfaceContainer {
	constructor(props) {
		super(props);
		properties.apply(this, props);
	}
}