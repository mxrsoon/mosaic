import { Static } from "#mosaic/utils/index.js";

export class ColorUtils extends Static {
	static validateHsv(h, s, v, a) {
		if (typeof(h) === "object") {
			a = h.a;
			v = h.v;
			s = h.s;
			h = h.h;
		}

		h = parseFloat(h); 
		s = parseFloat(s); 
		v = parseFloat(v);
		a = parseFloat(a);

		if (h == null || s == null || v == null || isNaN(h) || isNaN(s)|| isNaN(v)) {
			throw new Error("Color values must be numeric");
		}

		if (h < 0 || s < 0 || v < 0 || !isFinite(h) || s > 1 || v > 1) {
			throw new Error("HSV must be formed by h: [0, 360), s: [0, 1], v: [0, 1] and an optional a: [0, 1] for alpha");
		}

		h = h % 360;

		return a == null || isNaN(a) ? {
			h: h,
			s: s,
			v: v
		} : {
			h: h,
			s: s,
			v: v,
			a: Math.min(Math.max(0, a), 1)
		};
	}

	static rgb2hsv(r, g, b, a) {
		if (typeof(r) === "object") {
			a = r.a;
			b = r.b;
			g = r.g;
			r = r.r;
		}
		
		let h = 0;
		let s = 0;
		let v = 0;

		r = parseInt(r, 10); 
		g = parseInt(g, 10); 
		b = parseInt(b, 10);
		a = parseFloat(a);

		if (r == null || g == null || b == null || isNaN(r) || isNaN(g)|| isNaN(b)) {
			throw new Error("Color values must be numeric");
		}

		if (r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255) {
			throw new Error("RGB values must be in the range 0 to 255.");
		}

		r = r / 255;
		g = g / 255;
		b = b / 255;

		let minRGB = Math.min(r, Math.min(g, b));
		let maxRGB = Math.max(r, Math.max(g, b));

		// Grayscale
		if (minRGB === maxRGB) {
			return a !== null && !isNaN(a) ? {
				h: 0,
				s: 0,
				v: minRGB,
				a: a
			} : {
				h: 0,
				s: 0,
				v: minRGB
			};
		}

		// Colors not on grayscale
		let diff = (r == minRGB) ? g - b : ((b == minRGB) ? r - g : b - r);
		h = (r == minRGB) ? 3 : ((b == minRGB) ? 1 : 5);

		h = 60 * (h - diff / (maxRGB - minRGB));
		s = (maxRGB - minRGB) / maxRGB;
		v = maxRGB;

		return a !== null && !isNaN(a) ? {
			h: h,
			s: s,
			v: v,
			a: Math.min(Math.max(0, a), 1)
		} : {
			h: h,
			s: s,
			v: v
		};
	}

	static hex2rgb(hex) {
		// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
		var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		hex = hex.replace(shorthandRegex, function(m, r, g, b) {
			return r + r + g + g + b + b;
		});

		// Check for 8-digit #RRGGBBAA format
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

		if (result) {
			return {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16),
				a: parseInt(result[4], 16) / 255
			}
		}

		// Check for 6-digit #RRGGBB format
		result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		
		if (result) {
			return {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16)
			};
		}

		throw new Error("Invalid HEX value");
	}

	static hsv2rgb(h, s, v, a) {
		const hsv = this.validateHsv(h, s, v, a);

		h = hsv.h;
		s = hsv.s;
		v = hsv.v;

		h = h / 360;

		var r, g, b, i, f, p, q, t;

		i = Math.floor(h * 6);
		f = h * 6 - i;
		p = v * (1 - s);
		q = v * (1 - f * s);
		t = v * (1 - (1 - f) * s);

		switch (i % 6) {
			case 0: r = v, g = t, b = p; break;
			case 1: r = q, g = v, b = p; break;
			case 2: r = p, g = v, b = t; break;
			case 3: r = p, g = q, b = v; break;
			case 4: r = t, g = p, b = v; break;
			case 5: r = v, g = p, b = q; break;
		}

		return "a" in hsv ? {
			r: Math.round(r * 255),
			g: Math.round(g * 255),
			b: Math.round(b * 255),
			a: hsv.a
		} : {
			r: Math.round(r * 255),
			g: Math.round(g * 255),
			b: Math.round(b * 255)
		};
	}

	static rgb2hex(r, g, b, a) {
		if (typeof(r) === "object") {
			a = r.a;
			b = r.b;
			g = r.g;
			r = r.r;
		}

		r = parseInt(r, 10); 
		g = parseInt(g, 10); 
		b = parseInt(b, 10);
		a = parseFloat(a);

		if (r == null || g == null || b == null || isNaN(r) || isNaN(g)|| isNaN(b)) {
			throw new Error("Color values must be numeric");
		}

		if (r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255) {
			throw new Error("RGB values must be in the range 0 to 255.");
		}

		if (a == null || isNaN(a)) {
			return "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
		}

		a = Math.floor(Math.min(Math.max(0, a), 1) * 255);
		return "#" + [r, g, b, a].map(x => x.toString(16).padStart(2, '0')).join('');
	}
}