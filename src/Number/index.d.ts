/**
 * An object that represents a number of any kind. All JavaScript numbers are 64-bit floating-point numbers.
 */
declare namespace Number {
	/** The largest number that can be represented in JavaScript. Equal to approximately 1.79E+308. */
	export const MAX_SAFE_INTEGER: number;

	/** The closest number to zero that can be represented in JavaScript. Equal to approximately 5.00E-324. */
	export const MIN_SAFE_INTEGER: number;

	/**
	 * A value that is not a number.
	 * In equality comparisons, NaN does not equal any value, including itself. To test whether a value is equivalent to NaN, use the isNaN function.
	 */
	// eslint-disable-next-line no-shadow-restricted-names
	export const NaN: number;

	/**
	 * Returns true if passed value is finite.
	 * Unlike the global isFinite, Number.isFinite doesn't forcibly convert the parameter to a
	 * number. Only finite values of the type number, result in true.
	 * @param number A numeric value.
	 */
	export function isFinite(number: unknown): number is number;

	/**
	 * Returns true if the value passed is an integer, false otherwise.
	 * @param number A numeric value.
	 */
	export function isInteger(number: unknown): number is number;

	/**
	 * Returns a Boolean value that indicates whether a value is the reserved value NaN (not a
	 * number). Unlike the global isNaN(), Number.isNaN() doesn't forcefully convert the parameter
	 * to a number. Only values of the type number, that are also NaN, result in true.
	 * @param number A numeric value.
	 */
	export function isNaN(number: unknown): number is number;

	/**
	 * Returns true if the value passed is a safe integer.
	 * @param number A numeric value.
	 */
	export function isSafeInteger(number: unknown): number is number;

	/**
	 * Returns a string containing a number represented in exponential notation.
	 * @param fractionDigits Number of digits after the decimal point. Must be in the range 0 - 20, inclusive.
	 */
	export function toExponential(number: number | string, fractionDigits?: number): string | undefined;

	/**
	 * Converts a value to a number. If it fails, it returns NaN.
	 * @param value
	 */
	export function Number(value?: unknown): number;
}

export = Number;
