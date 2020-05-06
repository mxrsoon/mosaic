import { Length } from "../index.js";
import { PrivateFields } from "../../utils/index.js";

/* Private fields for PercentageLength class */
const privates = new PrivateFields(function(percentage, relativeTo) {
    return {
        percentage: percentage,
        relativeTo: relativeTo
    };
});

export class PercentageLength extends Length {
    constructor(percentage, relativeTo = 1) {
        super(0);
        privates.apply(this, percentage, relativeTo);
    }

    get relativeTo() {
        return this.$.relativeTo;
    }

    set relativeTo(val) {
        this.$.relativeTo = val;
    }

    get percentage() {
        return this.$.percentage;
    }

    set percentage(val) {
        this.$.percentage = val;
    }

    valueOf() {
        let relativeValue = this.$.relativeTo;
        
        if (typeof(relativeValue) === "function") {
            relativeValue = relativeValue();
        }
        
        if (isNaN(relativeValue)) {
            throw new Error("Relative value must be a number or a function that returns one");
        }

        return this.percentage * relativeValue;
    }
}