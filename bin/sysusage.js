#!/usr/bin/env node

const {
	getMemoryUsage,
	createCpuCalculator,
} = require('..');

const getCpuUsage = createCpuCalculator();
const getCpuAverage = createCpuCalculator(10);

setInterval(() => {
	console.debug(
		new Date().toISOString(),
		'CPU',
		Number(getCpuUsage().toFixed(2)),
		'AVG',
		Number(getCpuAverage().toFixed(2)),
		'RAM',
		Number(getMemoryUsage().toFixed(2)),
	);
}, 1000);
