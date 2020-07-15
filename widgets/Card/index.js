import { Color, ShadowStyle, CornerRadius, RectangleShape } from "#mosaic/drawing/index.js";
import { ThemeColor } from "#mosaic/resources/index.js";
import { PropertySet } from "#mosaic/utils/index.js";
import { SurfaceContainer } from "#mosaic/widgets/index.js";

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