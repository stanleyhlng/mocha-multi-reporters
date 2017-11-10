/* global require, module, console */

var _ = {
    get: require('lodash/get'),
    camelCase: require('lodash/camelCase'),
    size: require('lodash/size'),
    after: require('lodash/after'),
    merge: require('lodash/merge')
};
var debug = require('debug')('mocha:reporters:MultiReporters');
var fs = require('fs');
var util = require('util')
var mocha = require('mocha');
var Base = mocha.reporters.Base;
var path = require('path');

function MultiReporters(runner, options) {
    Base.call(this, runner);

    if (_.get(options, 'execute', true)) {

        options = this.getOptions(options);

        this._reporters = _.get(options, 'reporterEnabled', 'tap').split(',').map(
            function processReporterEnabled(name, index) {
                debug(name, index);

                name = name.trim();

                var reporterOptions = this.getReporterOptions(options, name);

                //
                // Mocha Reporters
                // https://github.com/mochajs/mocha/blob/master/lib/reporters/index.js
                //
                var Reporter = _.get(mocha, ['reporters', name], null);

                //
                // External Reporters.
                // Try to load reporters from process.cwd() and node_modules.
                //
                if (Reporter === null) {
                    try {
                        Reporter = require(name);
                    }
                    catch (err) {
                        if (err.message.indexOf('Cannot find module') !== -1) {
                            // Try to load reporters from a path (absolute or relative)
                            try {
                                Reporter = require(path.resolve(process.cwd(), name));
                            }
                            catch (_err) {
                                _err.message.indexOf('Cannot find module') !== -1 ? console.warn('"' + name + '" reporter not found')
                                    : console.warn('"' + name + '" reporter blew up with error:\n' + _err.stack);
                            }
                        }
                        else {
                            console.warn('"' + name + '" reporter blew up with error:\n' + err.stack);
                        }
                    }
                }

                if (Reporter !== null) {
                    return new Reporter(
                        runner, {
                            reporterOptions: reporterOptions
                        }
                    );
                }
                else {
                    console.error('Reporter does not found!', name);
                }
            }.bind(this)
        );
    }
}

util.inherits(MultiReporters, Base);

MultiReporters.CONFIG_FILE = '../config.json';

MultiReporters.prototype.done = function (failures, fn) {
    var numberOfReporters = _.size(this._reporters);

    if (numberOfReporters === 0) {
        console.error('Unable to invoke fn(failures) - no reporters were registered');
        return;
    }

    var reportersWithDoneHandler = this._reporters.filter(function (reporter) {
        return typeof reporter.done === 'function';
    });

    var numberOfReportersWithDoneHandler = _.size(reportersWithDoneHandler);

    if (numberOfReportersWithDoneHandler === 0) {
        return fn(failures);
    }

    var done = _.after(numberOfReportersWithDoneHandler, function() {
        fn(failures);
    });

    reportersWithDoneHandler.forEach(function(reporter) {
        reporter.done(failures, done);
    });
};

MultiReporters.prototype.getOptions = function (options) {
    debug('options', options);
    var resultantOptions = _.merge({}, this.getDefaultOptions(), this.getCustomOptions(options));
    debug('options file (resultant)', resultantOptions);
    return resultantOptions;
};

MultiReporters.prototype.getCustomOptions = function (options) {
    var customOptionsFile = _.get(options, 'reporterOptions.configFile');
    debug('options file (custom)', customOptionsFile);

    var customOptions;
    if (customOptionsFile) {
        customOptionsFile = path.resolve(customOptionsFile);
        debug('options file (custom)', customOptionsFile);

        try {
          if ('.js' === path.extname(customOptionsFile)) {
              customOptions = require(customOptionsFile);
          }
          else {
              customOptions = JSON.parse(fs.readFileSync(customOptionsFile).toString());
          }

          debug('options (custom)', customOptions);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
    else {
        customOptions = _.get(options, "reporterOptions");
    }

    return customOptions;
};

MultiReporters.prototype.getDefaultOptions = function () {
    var defaultOptionsFile = require.resolve(MultiReporters.CONFIG_FILE);
    debug('options file (default)', defaultOptionsFile);

    var defaultOptions = fs.readFileSync(defaultOptionsFile).toString();
    debug('options (default)', defaultOptions);

    try {
        defaultOptions = JSON.parse(defaultOptions);
    }
    catch (e) {
        console.error(e);
        throw e;
    }

    return defaultOptions;
};

MultiReporters.prototype.getReporterOptions = function (options, name) {
    var _name = name;
    var commonReporterOptions = _.get(options, 'reporterOptions', {});
    debug('reporter options (common)', _name, commonReporterOptions);

    name = [_.camelCase(name), 'ReporterOptions'].join('');
    var customReporterOptions = _.get(options, [name], {});
    debug('reporter options (custom)', _name, customReporterOptions);

    var resultantReporterOptions = _.merge({}, commonReporterOptions, customReporterOptions);
    debug('reporter options (resultant)', _name, resultantReporterOptions);

    return resultantReporterOptions;
};

module.exports = MultiReporters;
