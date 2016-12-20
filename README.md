mocha-multi-reporters
===

Generate multiple mocha reports in a single mocha execution.

[![npm version](https://img.shields.io/npm/v/mocha-multi-reporters.svg?style=flat-square)](https://www.npmjs.com/package/mocha-multi-reporters)
[![StyleCI](https://styleci.io/repos/48823069/shield)](https://styleci.io/repos/48823069)
[![Build Status](https://travis-ci.org/stanleyhlng/mocha-multi-reporters.svg)](https://travis-ci.org/stanleyhlng/mocha-multi-reporters)
[![bitHound Overall Score](https://www.bithound.io/github/stanleyhlng/mocha-multi-reporters/badges/score.svg)](https://www.bithound.io/github/stanleyhlng/mocha-multi-reporters)
[![Coverage Status](https://coveralls.io/repos/stanleyhlng/mocha-multi-reporters/badge.svg?branch=master&service=github)](https://coveralls.io/github/stanleyhlng/mocha-multi-reporters?branch=master)

## Install

```
npm install mocha-multi-reporters --save-dev
```

## Demo
https://github.com/stanleyhlng/mocha-multi-reporters-demo

## Usage

### Basic

```bash
$ ./node_modules/.bin/mocha --reporter mocha-multi-reporters
  mocha-test #1
    ✓ sample test #1.1
    ✓ sample test #1.2

  mocha-test #2
    ✓ sample test #2.1
    - sample test #2.2


  3 passing (6ms)
  1 pending

<testsuite name="Mocha Tests" tests="4" failures="0" errors="0" skipped="1" timestamp="Sun, 03 Jan 2016 08:15:14 GMT" time="0.005">
<testcase classname="mocha-test #1" name="sample test #1.1" time="0"/>
<testcase classname="mocha-test #1" name="sample test #1.2" time="0"/>
<testcase classname="mocha-test #2" name="sample test #2.1" time="0"/>
<testcase classname="mocha-test #2" name="sample test #2.2" time="0"><skipped/></testcase>
</testsuite>
```

### Advance

* Generate `spec` and `json` reports.

```js
// File: config.json
{
    "reporterEnabled": "spec, json"
}
```

```bash
$ ./node_modules/.bin/mocha --reporter mocha-multi-reporters --reporter-options configFile=config.json
  mocha-test #1
    ✓ sample test #1.1
    ✓ sample test #1.2

  mocha-test #2
    ✓ sample test #2.1
    - sample test #2.2


  3 passing (6ms)
  1 pending

{
  "stats": {
    "suites": 2,
    "tests": 4,
    "passes": 3,
    "pending": 1,
    "failures": 0,
    "start": "2015-12-30T22:49:39.713Z",
    "end": "2015-12-30T22:49:39.717Z",
    "duration": 4
  },
  "tests": [
    {
      "title": "sample test #1.1",
      "fullTitle": "mocha-test #1 sample test #1.1",
      "duration": 1,
      "err": {}
    },
    {
      "title": "sample test #1.2",
      "fullTitle": "mocha-test #1 sample test #1.2",
      "duration": 0,
      "err": {}
    },
    {
      "title": "sample test #2.1",
      "fullTitle": "mocha-test #2 sample test #2.1",
      "duration": 0,
      "err": {}
    },
    {
      "title": "sample test #2.2",
      "fullTitle": "mocha-test #2 sample test #2.2",
      "err": {}
    }
  ],
  "pending": [
    {
      "title": "sample test #2.2",
      "fullTitle": "mocha-test #2 sample test #2.2",
      "err": {}
    }
  ],
  "failures": [],
  "passes": [
    {
      "title": "sample test #1.1",
      "fullTitle": "mocha-test #1 sample test #1.1",
      "duration": 1,
      "err": {}
    },
    {
      "title": "sample test #1.2",
      "fullTitle": "mocha-test #1 sample test #1.2",
      "duration": 0,
      "err": {}
    },
    {
      "title": "sample test #2.1",
      "fullTitle": "mocha-test #2 sample test #2.1",
      "duration": 0,
      "err": {}
    }
  ]
}%
```

* Generate `tap` and `xunit` reports.

```js
// File: config.json
{
    "reporterEnabled": "tap, xunit",
    "xunitReporterOptions": {
        "output": "xunit-custom.xml"
    }
}
```
```bash
$ ./node_modules/.bin/mocha --reporter mocha-multi-reporters --reporter-options configFile=config.json

1..4
ok 1 mocha-test 1 sample test 1.1
ok 2 mocha-test 1 sample test 1.2
ok 3 mocha-test 2 sample test 2.1
ok 4 mocha-test 2 sample test 2.2 # SKIP -
# tests 3
# pass 3
# fail 0

$ cat xunit-custom.xml
<testsuite name="Mocha Tests" tests="4" failures="0" errors="0" skipped="1" timestamp="Sun, 03 Jan 2016 08:02:24 GMT" time="0.006">
<testcase classname="mocha-test #1" name="sample test #1.1" time="0.001"/>
<testcase classname="mocha-test #1" name="sample test #1.2" time="0.001"/>
<testcase classname="mocha-test #2" name="sample test #2.1" time="0"/>
<testcase classname="mocha-test #2" name="sample test #2.2" time="0"><skipped/></testcase>
</testsuite>
```

* Generate `tap` and `junit` reports.

To generate `junit` report, we are using [mocha-junit-reporter](https://www.npmjs.com/package/mocha-junit-reporter).

```bash
$ npm install mocha-junit-reporter
```
```js
// File: config.json
{
    "reporterEnabled": "mocha-junit-reporter",
    "mochaJunitReporterReporterOptions": {
	    "mochaFile": "junit-custom.xml"
    }
}
```
```bash
$ ./node_modules/.bin/mocha --reporter mocha-multi-reporters --reporter-options configFile=config.json

1..4
ok 1 mocha-test 1 sample test 1.1
ok 2 mocha-test 1 sample test 1.2
ok 3 mocha-test 2 sample test 2.1
ok 4 mocha-test 2 sample test 2.2 # SKIP -
# tests 3
# pass 3
# fail 0

$ cat xunit-custom.xml
<?xml version="1.0" encoding="UTF-8"?>
<testsuites name="Mocha Tests" time="0.001" tests="4" failures="0" skipped="1">
  <testsuite name="Root Suite" timestamp="2016-10-30T02:27:54" tests="0" failures="0" time="0">
  </testsuite>
  <testsuite name="mocha-test #1" timestamp="2016-10-30T02:27:54" tests="2" failures="0" time="0.001">
    <testcase name="mocha-test #1 sample test #1.1" time="0.001" classname="sample test #1.1">
    </testcase>
    <testcase name="mocha-test #1 sample test #1.2" time="0" classname="sample test #1.2">
    </testcase>
  </testsuite>
  <testsuite name="mocha-test #2" timestamp="2016-10-30T02:27:54" tests="2" failures="0" time="0">
    <testcase name="mocha-test #2 sample test #2.1" time="0" classname="sample test #2.1">
    </testcase>
  </testsuite>
</testsuites>
```

## License

The MIT License (MIT)

Copyright(c) 2016 Stanley Ng

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
