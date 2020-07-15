import { Length } from "@mosaic/layout/index.js";
import { PrivateFields } from "@mosaic/utils/index.js";

/* Private fields for ComplexLength class */
const privates = new PrivateFields(function(calculator) {
    return {
        calculator: calculator
    };
});

export class ComplexLength extends Length {
    constructor(calculator) {
        super(0);
        privates.setup(this, calculator);
    }

    get calculator() {
        return privates(this).calculator;
    }

    set calculator(val) {
        privates(this).calculator = val;
    }

    valueOf() {
        let value;
        
        if (typeof(this.calculator) === "function") {
            value = this.calculator();
        }

        if (!isFinite(value)) {
            throw new Error("Calculator function must return a finite numeric value");
        }

        return value;
    }
}