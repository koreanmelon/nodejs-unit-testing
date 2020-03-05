import { AssertionError } from "./Throwables.js";
import Colors from "./Colors.js";

export default class JSUnit {

    /**
     * Check that the actual value matches the expected value.
     * @param {*} expected 
     * @param {*} actual 
     * @param {String} message 
     * @throws {Failure}
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
     * @returns {void}
     */
    static test(testClass) {
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
            console.group(this.makeColored(`Running ${test.name}\n`, Colors.FgYellow));
            try {
                test.run();
                console.log(`Passed\n`);
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
