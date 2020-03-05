export class AssertionError extends Error {

    constructor(expected, actual, message = "") {
        super(message);
        this._expected = expected;
        this._actual = actual;
        this.name = this.constructor.name;
    }

    get expected() {
        return this._expected;
    }
    
    get actual() {
        return this._actual;
    }
}