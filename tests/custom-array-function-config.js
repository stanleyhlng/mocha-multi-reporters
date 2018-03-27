var customInternalReporter = require("tests/custom-internal-reporter")
module.exports = {
    "reporterEnabled": ["dot", customInternalReporter],

    "xunitReporterOptions": {
        "output": "artifacts/test/custom-xunit.xml"
    }
}
