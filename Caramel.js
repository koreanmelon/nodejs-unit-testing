import Colors from "./Colors.js";
import "./Errors.js";
import { AssertionError } from "./Errors.js";

export default class {

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
                console.group(this.makeColored(`Running ${test.name}\n`, Colors.FgYellow));
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