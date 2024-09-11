/* eslint-disable unicorn/filename-case */

import type NumberNamespace from "./Number";
const { isFinite } = require(script.Parent!.FindFirstChild("Number")! as ModuleScript) as typeof NumberNamespace;

export const E = math.exp(1);
export const LN2 = math.log(2);
export const LN10 = math.log(10);
export const LOG2E = 1 / LN2;
export const LOG10E = 1 / LN10;
export const PI = math.pi;
export const SQRT1_2 = math.sqrt(0.5);
export const SQRT2 = math.sqrt(2);

/**
 * Returns an implementation-dependent approximation to the cube root of number.
 * @param value A numeric expression.
 */
export function cbrt(value: number) {
	return math.sign(value) * math.abs(value) ** (1 / 3);
}

/**
 * Returns the number of leading zero bits in the 32-bit binary representation of a number.
 * @param x A numeric expression.
 * @return An integer between 0 and 31.
 */
export const clz32 = bit32.countlz;

/**
 * Returns the result of (e^x - 1), which is an implementation-dependent approximation to
 * subtracting 1 from the exponential function of x (e raised to the power of x, where e
 * is the base of the natural logarithms).
 * @param value A numeric expression.
 */
export function expm1(value: number) {
	return math.exp(value) - 1;
}

const EPSILON = 2 ** -52;
const EPSILON32 = 2 ** -23;
const MAX32 = 2 ** 127 * (2 - EPSILON32);
const MIN32 = 2 ** -126;

function roundTiesToEven(value: number) {
	return value + 1 / EPSILON - 1 / EPSILON;
}

/**
 * Returns the nearest single precision float representation of a number.
 * @param value A numeric expression.
 */
export function fround(value: number) {
	const absoluteValue = math.abs(value);
	const signValue = math.sign(value);

	if (absoluteValue < MIN32)
		return signValue * roundTiesToEven(absoluteValue / MIN32 / EPSILON32) * MIN32 * EPSILON32;

	const valueA = (1 + EPSILON32 / EPSILON) * absoluteValue;
	const result = valueA - (valueA - absoluteValue);

	// biome-ignore lint/suspicious/noSelfCompare: this is a nan check
	return result > MAX32 || result !== result ? signValue * math.huge : signValue * result;
}

/**
 * Returns the square root of the sum of squares of its arguments.
 * @param values Values to compute the square root for.
 *     If no arguments are passed, the result is +0.
 *     If there is only one argument, the result is the absolute value.
 *     If any argument is +Infinity or -Infinity, the result is +Infinity.
 *     If any argument is NaN, the result is NaN.
 *     If all arguments are either +0 or −0, the result is +0.
 */
export function hypot(...values: ReadonlyArray<number>) {
	const size = values.size();
	let sum = 0;
	let index = 0;
	let lastArgument = 0;

	let divideResult: number;

	while (index < size) {
		const argument = math.abs(values[index++]);
		if (lastArgument < argument) {
			divideResult = lastArgument / argument;
			sum = sum * divideResult * divideResult + 1;
			lastArgument = argument;
		} else if (argument > 0) {
			divideResult = argument / lastArgument;
			sum += divideResult * divideResult;
		} else sum += argument;
	}

	return lastArgument === math.huge ? math.huge : lastArgument * (sum === 0 ? 1 : math.sqrt(sum));
}

export function log1p(value: number) {
	return value > -1e-8 && value < 1e-8 ? value - (value * value) / 2 : math.log(1 + value);
}

export function log2(value: number) {
	return math.log(value, 2);
}

export function round(value: number) {
	if (!isFinite(value) || value % 1 === 0) return value;
	if (value < 0.5 && value > 0) return 0;
	if (value < 0 && value >= -0.5) return -0;
	return value - math.floor(value) >= 0.5 ? math.ceil(value) : math.floor(value);
}

export function trunc(value: number) {
	return value < 0 ? math.ceil(value) : math.floor(value);
}
