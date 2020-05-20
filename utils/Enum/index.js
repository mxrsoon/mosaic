/**
 * Utility class for simulating enums.
 * @hideconstructor
 * @abstract
 */
export class Enum {
    constructor() { throw new Error("Unable to instantiate enum") }

    static [Symbol.hasInstance](instance) {
        for (let prop of Object.getOwnPropertyNames(this)) {
            if (this[prop] === instance) {
                return true;
            }
        }

        return false;
    }
}