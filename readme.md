[![npm version](https://img.shields.io/npm/v/sysusage.svg?logo=npm)](https://www.npmjs.com/package/sysusage)

# About

Basic system usage monitor.

Gives you a simple CPU and RAM usage percentage with zero dependencies.

# Usage

Install using npm:

```
$ npm install sysusage
```

This will also add a `sysusage` command that prints the 1s and 10s CPU usage along with the RAM usage.

## getMemoryUsage

Returns system memory usage percent.

```
const { getMemoryUsage } = require('sysusage');

console.log(getMemoryUsage());
```

## createCpuCalculator

This creates a function that returns the CPU usage using a window of X calls (defaults to 1).

```
const { createCpuCalculator } = require('sysusage');

const getCpuUsage = createCpuCalculator();
setTimeout(() => console.debug(getCpuUsage()), 1000);
```

For example to get the usage of the previous 10 seconds, use a size of 10 with a 1 second interval:

```
const { createCpuCalculator } = require('sysusage');

const getCpuUsage = createCpuCalculator(10);
setInterval(() => console.debug(getCpuUsage()), 1000);
```
