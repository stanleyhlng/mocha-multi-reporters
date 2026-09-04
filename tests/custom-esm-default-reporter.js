'use strict';

const mocha = require('mocha');
const {Base} = mocha.reporters;

/**
 * This mimics the CJS interop shape Node produces for a reporter authored as
 * `export default class Reporter extends Base {}` and compiled/loaded via require():
 * a namespace object with a `default` property, rather than the class itself.
 */
class EsmReporterStub extends Base {
    constructor(runner) {
        super(runner);
    }
}

module.exports = {
    __esModule: true,
    default: EsmReporterStub
};

module.exports.EsmReporterStub = EsmReporterStub;
