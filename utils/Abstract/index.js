export class Abstract {
    constructor() {
        let constructor = Object.getPrototypeOf(this).constructor;
        
        if (constructor === Abstract || Object.getPrototypeOf(constructor) === Abstract) {
            throw new Error("Unable to instantiate abstract class");
        }
    }
}