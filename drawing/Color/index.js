import { PrivateFields, ColorUtils } from "../../utils/index.js";

/* Private fields for Color class */
const privates = new PrivateFields(function() {
	return {
		hue: 0,
		saturation: 0,
		vibrancy: 0,
		alpha: 0
	};
});

/**
 * Class representing a color.
 */
export class Color {
	/**
	 * @param {number} h - Hue value in [0, 360) range.
	 * @param {number} s - Saturation amount in [0, 1] range.
	 * @param {number} v - Vibrancy amount in [0, 1] range.
	 * @param {number} a - Alpha value in [0, 1] range.
	 */
	constructor(h, s, v, a = 1) {
		privates.setup(this);

		const hsv = ColorUtils.validateHsv(h, s, v, a);

		privates(this).hue = hsv.h;
		privates(this).saturation = hsv.s;
		privates(this).vibrancy = hsv.v;
		privates(this).alpha = hsv.a;
	}

	/**
	 * Returns an object containing the HSV representation of the color.
	 * @returns {Color~HSVColorObject} The HSV representation of the color.
	 */
	toHsv() {
		const a = privates(this).alpha;

		return a === 1 ? {
			h: privates(this).hue,
			s: privates(this).saturation,
			v: privates(this).vibrancy
		} : {
			h: privates(this).hue,
			s: privates(this).saturation,
			v: privates(this).vibrancy,
			a: a
		};
	}

	/**
	 * Returns an object containing the RGB representation of the color.
	 * @returns {Color~RGBColorObject} The RGB representation of the color.
	 */
	toRgb() {
		return ColorUtils.hsv2rgb(this.toHsv());
	}

	/**
	 * Returns a string representation of this color in hexadecimal notation.
	 * @returns {string} The HEX representation of the color in the 6-digit format (#RRGGBB)
	 * or 8-digit format (#RRGGBBAA) if the color is not opaque.
	 */
	toHex() {
		return ColorUtils.rgb2hex(this.toRgb());
	}

	valueOf() {
		return this.toHex();
	}

	toString() {
		return this.toHex();
	}

	/**
	 * Create a Color object from RGB values.
	 * @param {number} r - Red amount in [0, 255] range.
	 * @param {number} g - Green amount in [0, 255] range.
	 * @param {number} b - Blue amount in [0, 255] range.
	 * @param {number} a - Alpha value in [0, 1] range.
	 * @returns {Color}
	 */
	static fromRgb(r, g, b, a = 1) {
		const hsv = ColorUtils.rgb2hsv(r, g, b, a);
		return new Color(hsv.h, hsv.s, hsv.v, hsv.a);
	}

	/**
	 * Create a Color object from HSV values.
	 * @param {number} h - Hue value in [0, 360) range.
	 * @param {number} s - Saturation amount in [0, 1] range.
	 * @param {number} v - Vibrancy amount in [0, 1] range.
	 * @param {number} a - Alpha value in [0, 1] range.
	 * @returns {Color}
	 */
	static fromHsv(h, s, v, a = 1) {
		return new Color(h, s, v, a);
	}

	/**
	 * Create a Color object from hexadecimal notation.
	 * @param {number} hex - HEX representation of a color in the 3-digit format (#RGB),
	 * 6-digit format (#RRGGBB) or 8-digit format (#RRGGBBAA).
	 * @returns {Color}
	 */
	static fromHex(hex) {
		const hsv = ColorUtils.rgb2hsv(ColorUtils.hex2rgb(hex));
		return new Color(hsv.h, hsv.s, hsv.v, hsv.a);
	}
}

Color.aliceBlue = Color.fromRgb(240, 248, 255);
Color.antiqueWhite = Color.fromRgb(250, 235, 215);
Color.aqua = Color.fromRgb(0, 255, 255);
Color.aquamarine = Color.fromRgb(127, 255, 212);
Color.azure = Color.fromRgb(240, 255, 255);
Color.beige = Color.fromRgb(245, 245, 220);
Color.bisque = Color.fromRgb(255, 228, 196);
Color.black = Color.fromRgb(0, 0, 0);
Color.blanchedAlmond = Color.fromRgb(255, 235, 205);
Color.blue = Color.fromRgb(0, 0, 255);
Color.blueViolet = Color.fromRgb(138, 43, 226);
Color.brown = Color.fromRgb(165, 42, 42);
Color.burlyWood = Color.fromRgb(222, 184, 135);
Color.cadetBlue = Color.fromRgb(95, 158, 160);
Color.chartreuse = Color.fromRgb(127, 255, 0);
Color.chocolate = Color.fromRgb(210, 105, 30);
Color.coral = Color.fromRgb(255, 127, 80);
Color.cornflowerBlue = Color.fromRgb(100, 149, 237);
Color.cornsilk = Color.fromRgb(255, 248, 220);
Color.crimson = Color.fromRgb(220, 20, 60);
Color.cyan = Color.fromRgb(0, 255, 255);
Color.darkBlue = Color.fromRgb(0, 0, 139);
Color.darkCyan = Color.fromRgb(0, 139, 139);
Color.darkGoldenRod = Color.fromRgb(184, 134, 11);
Color.darkGray = Color.fromRgb(169, 169, 169);
Color.darkGrey = Color.fromRgb(169, 169, 169);
Color.darkGreen = Color.fromRgb(0, 100, 0);
Color.darkKhaki = Color.fromRgb(189, 183, 107);
Color.darkMagenta = Color.fromRgb(139, 0, 139);
Color.darkOliveGreen = Color.fromRgb(85, 107, 47);
Color.darkOrange = Color.fromRgb(255, 140, 0);
Color.darkOrchid = Color.fromRgb(153, 50, 204);
Color.darkRed = Color.fromRgb(139, 0, 0);
Color.darkSalmon = Color.fromRgb(233, 150, 122);
Color.darkSeaGreen = Color.fromRgb(143, 188, 143);
Color.darkSlateBlue = Color.fromRgb(72, 61, 139);
Color.darkSlateGray = Color.fromRgb(47, 79, 79);
Color.darkSlateGrey = Color.fromRgb(47, 79, 79);
Color.darkTurquoise = Color.fromRgb(0, 206, 209);
Color.darkViolet = Color.fromRgb(148, 0, 211);
Color.deepPink = Color.fromRgb(255, 20, 147);
Color.deepSkyBlue = Color.fromRgb(0, 191, 255);
Color.dimGray = Color.fromRgb(105, 105, 105);
Color.dimGrey = Color.fromRgb(105, 105, 105);
Color.dodgerBlue = Color.fromRgb(30, 144, 255);
Color.fireBrick = Color.fromRgb(178, 34, 34);
Color.floralWhite = Color.fromRgb(255, 250, 240);
Color.forestGreen = Color.fromRgb(34, 139, 34);
Color.fuchsia = Color.fromRgb(255, 0, 255);
Color.gainsboro = Color.fromRgb(220, 220, 220);
Color.ghostWhite = Color.fromRgb(248, 248, 255);
Color.gold = Color.fromRgb(255, 215, 0);
Color.goldenRod = Color.fromRgb(218, 165, 32);
Color.gray = Color.fromRgb(128, 128, 128);
Color.grey = Color.fromRgb(128, 128, 128);
Color.green = Color.fromRgb(0, 128, 0);
Color.greenYellow = Color.fromRgb(173, 255, 47);
Color.honeyDew = Color.fromRgb(240, 255, 240);
Color.hotPink = Color.fromRgb(255, 105, 180);
Color.indianRed  = Color.fromRgb(205, 92, 92);
Color.indigo   = Color.fromRgb(75, 0, 130);
Color.ivory = Color.fromRgb(255, 255, 240);
Color.khaki = Color.fromRgb(240, 230, 140);
Color.lavender = Color.fromRgb(230, 230, 250);
Color.lavenderBlush = Color.fromRgb(255, 240, 245);
Color.lawnGreen = Color.fromRgb(124, 252, 0);
Color.lemonChiffon = Color.fromRgb(255, 250, 205);
Color.lightBlue = Color.fromRgb(173, 216, 230);
Color.lightCoral = Color.fromRgb(240, 128, 128);
Color.lightCyan = Color.fromRgb(224, 255, 255);
Color.lightGoldenRodYellow = Color.fromRgb(250, 250, 210);
Color.lightGray = Color.fromRgb(211, 211, 211);
Color.lightGrey = Color.fromRgb(211, 211, 211);
Color.lightGreen = Color.fromRgb(144, 238, 144);
Color.lightPink = Color.fromRgb(255, 182, 193);
Color.lightSalmon = Color.fromRgb(255, 160, 122);
Color.lightSeaGreen = Color.fromRgb(32, 178, 170);
Color.lightSkyBlue = Color.fromRgb(135, 206, 250);
Color.lightSlateGray = Color.fromRgb(119, 136, 153);
Color.lightSlateGrey = Color.fromRgb(119, 136, 153);
Color.lightSteelBlue = Color.fromRgb(176, 196, 222);
Color.lightYellow = Color.fromRgb(255, 255, 224);
Color.lime = Color.fromRgb(0, 255, 0);
Color.limeGreen = Color.fromRgb(50, 205, 50);
Color.linen = Color.fromRgb(250, 240, 230);
Color.magenta = Color.fromRgb(255, 0, 255);
Color.maroon = Color.fromRgb(128, 0, 0);
Color.mediumAquaMarine = Color.fromRgb(102, 205, 170);
Color.mediumBlue = Color.fromRgb(0, 0, 205);
Color.mediumOrchid = Color.fromRgb(186, 85, 211);
Color.mediumPurple = Color.fromRgb(147, 112, 219);
Color.mediumSeaGreen = Color.fromRgb(60, 179, 113);
Color.mediumSlateBlue = Color.fromRgb(123, 104, 238);
Color.mediumSpringGreen = Color.fromRgb(0, 250, 154);
Color.mediumTurquoise = Color.fromRgb(72, 209, 204);
Color.mediumVioletRed = Color.fromRgb(199, 21, 133);
Color.midnightBlue = Color.fromRgb(25, 25, 112);
Color.mintCream = Color.fromRgb(245, 255, 250);
Color.mistyRose = Color.fromRgb(255, 228, 225);
Color.moccasin = Color.fromRgb(255, 228, 181);
Color.navajoWhite = Color.fromRgb(255, 222, 173);
Color.navy = Color.fromRgb(0, 0, 128);
Color.oldLace = Color.fromRgb(253, 245, 230);
Color.olive = Color.fromRgb(128, 128, 0);
Color.oliveDrab = Color.fromRgb(107, 142, 35);
Color.orange = Color.fromRgb(255, 165, 0);
Color.orangeRed = Color.fromRgb(255, 69, 0);
Color.orchid = Color.fromRgb(218, 112, 214);
Color.paleGoldenRod = Color.fromRgb(238, 232, 170);
Color.paleGreen = Color.fromRgb(152, 251, 152);
Color.paleTurquoise = Color.fromRgb(175, 238, 238);
Color.paleVioletRed = Color.fromRgb(219, 112, 147);
Color.papayaWhip = Color.fromRgb(255, 239, 213);
Color.peachPuff = Color.fromRgb(255, 218, 185);
Color.peru = Color.fromRgb(205, 133, 63);
Color.pink = Color.fromRgb(255, 192, 203);
Color.plum = Color.fromRgb(221, 160, 221);
Color.powderBlue = Color.fromRgb(176, 224, 230);
Color.purple = Color.fromRgb(128, 0, 128);
Color.rebeccaPurple = Color.fromRgb(102, 51, 153);
Color.red = Color.fromRgb(255, 0, 0);
Color.rosyBrown = Color.fromRgb(188, 143, 143);
Color.royalBlue = Color.fromRgb(65, 105, 225);
Color.saddleBrown = Color.fromRgb(139, 69, 19);
Color.salmon = Color.fromRgb(250, 128, 114);
Color.sandyBrown = Color.fromRgb(244, 164, 96);
Color.seaGreen = Color.fromRgb(46, 139, 87);
Color.seaShell = Color.fromRgb(255, 245, 238);
Color.sienna = Color.fromRgb(160, 82, 45);
Color.silver = Color.fromRgb(192, 192, 192);
Color.skyBlue = Color.fromRgb(135, 206, 235);
Color.slateBlue = Color.fromRgb(106, 90, 205);
Color.slateGray = Color.fromRgb(112, 128, 144);
Color.slateGrey = Color.fromRgb(112, 128, 144);
Color.snow = Color.fromRgb(255, 250, 250);
Color.springGreen = Color.fromRgb(0, 255, 127);
Color.steelBlue = Color.fromRgb(70, 130, 180);
Color.tan = Color.fromRgb(210, 180, 140);
Color.teal = Color.fromRgb(0, 128, 128);
Color.thistle = Color.fromRgb(216, 191, 216);
Color.tomato = Color.fromRgb(255, 99, 71);
Color.transparent = Color.fromRgb(0, 0, 0, 0);
Color.turquoise = Color.fromRgb(64, 224, 208);
Color.violet = Color.fromRgb(238, 130, 238);
Color.wheat = Color.fromRgb(245, 222, 179);
Color.white = Color.fromRgb(255, 255, 255);
Color.whiteSmoke = Color.fromRgb(245, 245, 245);
Color.yellow = Color.fromRgb(255, 255, 0);
Color.yellowGreen = Color.fromRgb(154, 205, 50);

/**
 * @typedef {object} Color~HSVColorObject
 * @prop {number} h - Hue of the color in [0, 360) range.
 * @prop {number} s - Saturation of the color in [0, 1] range.
 * @prop {number} v - Vibrancy of the color in [0, 1] range.
 * @prop {number} [a] - Alpha of the color in [0, 1] range.
 */

 /**
 * @typedef {object} Color~RGBColorObject
 * @prop {number} r - Red amount of the color in [0, 255] range.
 * @prop {number} g - Green amount of the color in [0, 255] range.
 * @prop {number} b - Blue amount of the color in [0, 255] range.
 * @prop {number} [a] - Alpha of the color in [0, 1] range.
 */