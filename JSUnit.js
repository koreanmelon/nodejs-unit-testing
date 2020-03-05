import { AssertionError } from "./Errors.js";
import Colors from "./Colors.js";

export default class JSUnit {

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
     * Prints to the console using colors.
     * @param {String} message 
     * @param {String} color 
     * @returns {String}
     */
    static makeColored(message, color) {
        return color + message + Colors.Reset;
    }

    /**
     * Tests all methods in the class TESTCLASS.
     * @param {*} testClass 
     * @param {Object} options
     * @returns {void}
     */
    static test(testClass, options = { "mutePassed": true }) {
        let allTests = [];
        Object.getOwnPropertyNames(testClass)
            .filter(prop => typeof testClass[prop] === "function")
            .forEach((val, ind, arr) => {
                allTests.push({
                    "name": val,
                    "run": testClass[val]
                });
            });
        let passedCount = 0;
        let failedCount = 0;
        for (let test of allTests) {
            try {
                test.run();
                if (!options.mutePassed) {
                    console.group(this.makeColored(`Running ${test.name}\n`, Colors.FgYellow));
                    console.log(`Passed\n`);
                }
                passedCount += 1;
            } catch (error) {
                if (error instanceof AssertionError) {
                    console.log(this.makeColored(`${error.stack}\n`, Colors.FgRed))
                    console.log(`Expected: ${error.expected}\nActual: ${error.actual}\n`);
                    failedCount += 1;
                } else {
                    console.error(error);
                }
            }
            console.groupEnd();
        }
        console.group(this.makeColored(`Results:\n`, Colors.FgYellow));
        console.log(`Passed: ${passedCount}\nFailed: ${failedCount}\n`);
        console.groupEnd();
    }

}
