import { AssertionError } from "./Errors.js";

export default class {

    /**
     * Check that the actual value matches the expected value.
     * @param {*} expected 
     * @param {*} actual 
     * @param {String} message 
     * @throws {AssertionError}
     * @returns {Boolean}
     */
    static assertEquals(expected, actual, message = "") {
        if (expected == actual) {
            return true;
        } else {
            throw new AssertionError(expected, actual, message);
        }
    }

    /**
     * Checks that the actual object matches the expected object.
     * @param {*} expected 
     * @param {*} actual 
     * @param {Strig} message 
     * @throws {AssertionError}
     * @returns {Boolean}
     */
    static assertObjectEquals(expected, actual, message = "") {
        if (expected.toString() == actual.toString()) {
            return true;
        } else {
            throw new AssertionError(expected, actual, message);
        }
    }

    /**
     * 
     * @param {Array} expected 
     * @param {Array} actual 
     * @param {String} message 
     */
    static assertArrayEquals(expected, actual, message = "") {
        if (expected.length != actual.length) {
            throw new AssertionError()
        }

    }
    
}