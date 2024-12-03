const {
	cpus,
	freemem,
	totalmem,
} = require('os');

/**
 * Calculates processor usage percent.
 * @callback CpuUsageCalculator
 * @returns {number}
 */

/**
 * Calculates used percentage based on free and total value.
 * @param {number} free
 * @param {number} total
 * @returns {number}
 */
const calculatePercent = (free, total) => 100 - (free / total * 100);

/**
 * Calculates memory usage percent.
 * @returns {number}
 */
const getMemoryUsage = () => calculatePercent(freemem(), totalmem());

/**
 * Calculates processor idle and total time.
 * @returns {[number, number]}
 */
const getCpuTimes = () => cpus().reduce(([idle, total], { times }) => [
	idle + times.idle,
	total + times.idle + times.user + times.nice + times.sys + times.irq,
], [0, 0]);

/**
 * Creates a function that calculates processor usage.
 * @param {number} size
 * @returns {CpuUsageCalculator}
 */
const createCpuCalculator = (size = 1) => {
	const measurements = [getCpuTimes()];
	
	return () => {
		const cpuTimes = getCpuTimes();
		const [curIdle, curTotal] = cpuTimes;
		const [prevIdle, prevTotal] = measurements.at(0) || [0, 0];
		
		const length = measurements.push(cpuTimes);
		if (length > size) {
			measurements.splice(0, 1);
		}
		
		return calculatePercent(curIdle - prevIdle || 1, curTotal - prevTotal || 1);
	};
};

module.exports = {
	calculatePercent,
	getMemoryUsage,
	getCpuTimes,
	createCpuCalculator,
};
