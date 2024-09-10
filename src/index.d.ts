import * as Collections from "./Collections";
import * as MathLibrary from "./Math";

interface Match {
	readonly index: number;
	readonly match: string;
}

declare namespace LuauPolyfill {
	/**
	 * Encodes a text string as a valid component of a Uniform Resource Identifier (URI).
	 * @param value A value representing an unencoded URI component.
	 */
	export function encodeURIComponent(value: string): string;

	export const Array: typeof Collections.ArrayUtilities;
	export const ArrayUtilities: typeof Collections.ArrayUtilities;
	export const Object: typeof Collections.ObjectUtilities;
	export const ObjectUtilities: typeof Collections.ObjectUtilities;

	export namespace util {
		export type InspectOptions = Collections.InspectOptions;

		/**
		 * Pretty-print an object the same as {@link console.log} to a `string`
		 *
		 * @param value
		 */
		export function inspect(value: unknown, options?: InspectOptions): string;
	}

	export const JsMap: typeof Collections.JsMap;
	export const JsSet: typeof Collections.JsSet;

	export interface Error {
		message: string;
		name: string;
		stack?: string;
	}
	interface ErrorConstructor {
		new (message?: string): Error;
		(message?: string): Error;
		readonly captureStackTrace: (error: Error, options: Callback) => void;
	}
	export const Error: ErrorConstructor;

	export const Symbol: {
		(name?: string): symbol;
		readonly for: (name?: string) => symbol;
	} & Record<string, symbol>;

	export interface Interval {
		/**
		 * @hidden
		 * @deprecated This property is not meant to be accessed directly.
		 */
		readonly __nominal: unique symbol;
	}
	export interface Timeout {
		/**
		 * @hidden
		 * @deprecated This property is not meant to be accessed directly.
		 */
		readonly __nominal: unique symbol;
	}

	/**
	 * Schedules repeated execution of `callback` every `delay` milliseconds.
	 *
	 * @param callback The function to call when the timer elapses.
	 * @param [delay=1] The number of milliseconds to wait before calling the `callback`.
	 * @param intervalArguments Optional arguments to pass when the `callback` is called.
	 * @return for use with {@link clearInterval}
	 */
	export function setInterval<TArguments extends Array<unknown>>(
		callback: (...intervalArguments: TArguments) => void,
		delay?: number,
		...intervalArguments: TArguments
	): Interval;
	/**
	 * Cancels an `Interval` object created by `setInterval()`.
	 * @param interval An `Interval` object as returned by {@link setInterval}.
	 */
	export function clearInterval(interval: Interval): void;

	/**
	 * Schedules execution of a one-time `callback` after `delay` milliseconds.
	 *
	 * @param callback The function to call when the timer elapses.
	 * @param [delay=1] The number of milliseconds to wait before calling the `callback`.
	 * @param timeoutArguments Optional arguments to pass when the `callback` is called.
	 * @return for use with {@link clearTimeout}
	 */
	export function setTimeout<TArguments extends Array<unknown>>(
		callback: (...timeoutArguments: TArguments) => void,
		delay?: number,
		...timeoutArguments: TArguments
	): Timeout;

	/**
	 * Cancels a `Timeout` object created by `setTimeout()`.
	 * @param timeout A `Timeout` object as returned by {@link setTimeout}.
	 */
	export function clearTimeout(timeout: Timeout): void;

	export namespace Boolean {
		export function toJSBoolean(value: unknown): boolean;
	}
	export namespace Number {
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
	export namespace String {
		/**
		 * Returns the Unicode value of the character at the specified location.
		 * @param index The zero-based index of the desired character. If there is no character at the specified index, NaN is returned.
		 */
		export function charCodeAt(value: string, index: number): number;

		/**
		 * Returns true if the sequence of elements of searchString converted to a String is the
		 * same as the corresponding elements of this object (converted to a String) starting at
		 * endPosition – length(this). Otherwise returns false.
		 */
		export function endsWith(value: string, searchString: string, endPosition?: number): boolean;

		export function findOr(value: string, patternTable: Array<string>, initialIndex?: number): Match | undefined;

		/**
		 * Returns true if searchString appears as a substring of the result of converting this
		 * object to a String, at one or more positions that are
		 * greater than or equal to position; otherwise, returns false.
		 * @param searchString search string
		 * @param position If position is undefined, 0 is assumed, so as to search all of the String.
		 */
		export function includes(value: string, searchString: string, position?: number): boolean;

		/**
		 * Returns the position of the first occurrence of a substring.
		 * @param searchString The substring to search for in the string
		 * @param position The index at which to begin searching the String object. If omitted, search starts at the beginning of the string.
		 */
		export function indexOf(value: string, searchString: string, position?: number): number;

		/**
		 * Returns the last occurrence of a substring in the string.
		 * @param searchString The substring to search for.
		 * @param position The index at which to begin searching. If omitted, the search begins at the end of the string.
		 */
		export function lastIndexOf(value: string, searchString: string, position?: number): number;

		/**
		 * Returns a section of a string.
		 * @param start The index to the beginning of the specified portion of stringObj.
		 * @param finish The index to the end of the specified portion of stringObj. The substring includes the characters up to, but not including, the character indicated by end.
		 * If this value is not specified, the substring continues to the end of stringObj.
		 */
		export function slice(value: string, start?: number, finish?: number): string;

		/**
		 * Split a string into substrings using the specified separator and return them as an array.
		 * @param separator A string that identifies character or characters to use in separating the string. If omitted, a single-element array containing the entire string is returned.
		 * @param limit A value used to limit the number of elements returned in the array.
		 */
		export function split(value: string, separator: string, limit?: number): Array<string>;

		/**
		 * Returns true if the sequence of elements of searchString converted to a String is the
		 * same as the corresponding elements of this object (converted to a String) starting at
		 * position. Otherwise returns false.
		 */
		export function startsWith(value: string, searchString: string, position?: number): boolean;

		/**
		 * Gets a substring beginning at the specified location and having the specified length.
		 * @param from The starting position of the desired substring. The index of the first character in the string is zero.
		 * @param length The number of characters to include in the returned substring.
		 */
		export function substr(value: string, from: number, length?: number): string;

		/** Removes the leading and trailing white space and line terminator characters from a string. */
		export function trim(value: string): string;

		/** Removes the trailing white space and line terminator characters from a string. */
		export function trimEnd(value: string): string;

		/** Removes the leading white space and line terminator characters from a string. */
		export function trimStart(value: string): string;
	}
	export const Math: typeof MathLibrary;

	export namespace console {
		/**
		 * When `stdout` is a TTY, calling `console.clear()` will attempt to clear the
		 * TTY. When `stdout` is not a TTY, this method does nothing.
		 *
		 * The specific operation of `console.clear()` can vary across operating systems
		 * and terminal types. For most Linux operating systems, `console.clear()` operates similarly to the `clear` shell command. On Windows, `console.clear()` will clear only the output in the
		 * current terminal viewport for the Node.js
		 * binary.
		 */
		export function clear(): void;

		/**
		 * The `console.debug()` function is an alias for {@link log}.
		 */
		export function debug(content: unknown, ...parameters: Array<unknown>): void;

		/**
		 * Prints to `stderr` with newline. Multiple arguments can be passed, with the
		 * first used as the primary message and all additional used as substitution
		 * values similar to [`printf(3)`](http://man7.org/linux/man-pages/man3/printf.3.html)
		 * (the arguments are all passed to [`util.format()`](https://nodejs.org/docs/latest-v20.x/api/util.html#utilformatformat-args)).
		 *
		 * ```js
		 * const code = 5;
		 * console.error('error #%d', code);
		 * // Prints: error #5, to stderr
		 * console.error('error', code);
		 * // Prints: error 5, to stderr
		 * ```
		 *
		 * If formatting elements (e.g. `%d`) are not found in the first string then
		 * [`util.inspect()`](https://nodejs.org/docs/latest-v20.x/api/util.html#utilinspectobject-options) is called on each argument and the
		 * resulting string values are concatenated. See [`util.format()`](https://nodejs.org/docs/latest-v20.x/api/util.html#utilformatformat-args)
		 * for more information.
		 */
		export function error(content: unknown, ...parameters: Array<unknown>): void;

		/**
		 * Increases indentation of subsequent lines by spaces for `groupIndentation` length.
		 *
		 * If one or more `label`s are provided, those are printed first without the
		 * additional indentation.
		 */
		export function group(content: unknown, ...parameters: Array<unknown>): void;

		/**
		 * An alias for {@link group}.
		 */
		export function groupCollapsed(content: unknown, ...parameters: Array<unknown>): void;

		/**
		 * Decreases indentation of subsequent lines by spaces for `groupIndentation` length.
		 */
		export function groupEnd(): void;

		/**
		 * The `console.info()` function is an alias for {@link log}.
		 */
		export function info(content: unknown, ...parameters: Array<unknown>): void;

		/**
		 * Prints to `stdout` with newline. Multiple arguments can be passed, with the
		 * first used as the primary message and all additional used as substitution
		 * values similar to [`printf(3)`](http://man7.org/linux/man-pages/man3/printf.3.html)
		 * (the arguments are all passed to [`util.format()`](https://nodejs.org/docs/latest-v20.x/api/util.html#utilformatformat-args)).
		 *
		 * ```js
		 * const count = 5;
		 * console.log('count: %d', count);
		 * // Prints: count: 5, to stdout
		 * console.log('count:', count);
		 * // Prints: count: 5, to stdout
		 * ```
		 *
		 * See [`util.format()`](https://nodejs.org/docs/latest-v20.x/api/util.html#utilformatformat-args) for more information.
		 */
		export function log(content: unknown, ...parameters: Array<unknown>): void;

		/**
		 * Starts a timer that can be used to compute the duration of an operation. Timers
		 * are identified by a unique `label`. Use the same `label` when calling {@link timeEnd} to stop the timer and output the elapsed time in
		 * suitable time units to `stdout`. For example, if the elapsed
		 * time is 3869ms, `console.timeEnd()` displays "3.869s".
		 * @param [label='default']
		 */
		export function time(label?: string): void;

		/**
		 * Stops a timer that was previously started by calling {@link time} and
		 * prints the result to `stdout`:
		 *
		 * ```js
		 * console.time('bunch-of-stuff');
		 * // Do a bunch of stuff.
		 * console.timeEnd('bunch-of-stuff');
		 * // Prints: bunch-of-stuff: 225.438ms
		 * ```
		 * @param [label='default']
		 */
		export function timeEnd(label?: string): void;

		/**
		 * The `console.warn()` function is an alias for {@link error}.
		 */
		export function warn(content: unknown, ...parameters: Array<unknown>): void;
	}
}

export = LuauPolyfill;
