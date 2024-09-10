type FlatArray<T, Depth extends number> = {
	done: T;
	recur: T extends ReadonlyArray<infer InnerArray>
		? FlatArray<InnerArray, [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20][Depth]>
		: T;
}[Depth extends -1 ? "done" : "recur"];

declare namespace ArrayUtilities {
	/**
	 * Combines two or more arrays.
	 * This method returns a new array without modifying any existing arrays.
	 * @param items Additional arrays and/or items to add to the end of the array.
	 */
	export function concat<T>(source: Array<T>, ...items: Array<Array<T>>): Array<T>;
	/**
	 * Combines two or more arrays.
	 * This method returns a new array without modifying any existing arrays.
	 * @param items Additional arrays and/or items to add to the end of the array.
	 */
	export function concat<T>(source: Array<T>, ...items: Array<Array<T> | T>): Array<T>;

	/**
	 * Returns a new array with all sub-array elements concatenated into it recursively up to the
	 * specified depth.
	 *
	 * @param depth The maximum recursion depth
	 */
	export function flat<T, Depth extends number = 1>(source: Array<T>, depth?: Depth): Array<FlatArray<T, Depth>>;

	/**
	 * Calls a defined callback function on each element of an array. Then, flattens the result into
	 * a new array.
	 * This is identical to a map followed by flat with depth 1.
	 *
	 * @param callback A function that accepts up to three arguments. The flatMap method calls the
	 * callback function one time for each element in the array.
	 */
	export function flatMap<T, U>(
		array: Array<T>,
		callback: (value: T, index: number, array: ReadonlyArray<T>) => ReadonlyArray<U> | U,
	): Array<U>;
	/**
	 * Calls a defined callback function on each element of an array. Then, flattens the result into
	 * a new array.
	 * This is identical to a map followed by flat with depth 1.
	 *
	 * @param callback A function that accepts up to three arguments. The flatMap method calls the
	 * callback function one time for each element in the array.
	 * @param thisArgument An object to which the this keyword can refer in the callback function. If
	 * thisArg is omitted, undefined is used as the this value.
	 */
	export function flatMap<T, U, This>(
		array: Array<T>,
		callback: (thisArgument: This, value: T, index: number, array: ReadonlyArray<T>) => ReadonlyArray<U> | U,
		thisArgument?: This,
	): Array<U>;

	// TODO: add Array.from

	/**
	 * Determines whether value is an array.
	 * @param value
	 */
	export function isArray<T>(value: unknown): value is Array<T>;

	/**
	 * Reverses the elements in an array in place.
	 * This method mutates the array and returns a reference to the same array.
	 */
	export function reverse<T>(array: Array<T>): Array<T>;

	/**
	 * Returns a copy of a section of an array.
	 * For both start and end, a negative index can be used to indicate an offset from the end of the array.
	 * For example, -2 refers to the second to last element of the array.
	 * @param start The beginning index of the specified portion of the array.
	 * If start is undefined, then the slice begins at index 0.
	 * @param finish The end index of the specified portion of the array. This is exclusive of the element at the index 'end'.
	 * If end is undefined, then the slice extends to the end of the array.
	 */
	export function slice<T>(array: Array<T>, start?: number, finish?: number): Array<T>;

	/**
	 * Sorts an array in place.
	 * This method mutates the array and returns a reference to the same array.
	 * @param compareFn Function used to determine the order of the elements. It is expected to return
	 * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
	 * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
	 * ```ts
	 * [11,2,22,1].sort((a, b) => a - b)
	 * ```
	 */
	export function sort<T>(array: Array<T>, compareFunction?: (a: T, b: T) => number): Array<T>;

	/**
	 * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
	 * @param start The zero-based location in the array from which to start removing elements.
	 * @param deleteCount The number of elements to remove.
	 * @returns An array containing the elements that were deleted.
	 */
	export function splice<T>(array: Array<T>, start: number, deleteCount?: number): Array<T>;
	/**
	 * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
	 * @param start The zero-based location in the array from which to start removing elements.
	 * @param deleteCount The number of elements to remove.
	 * @param items Elements to insert into the array in place of the deleted elements.
	 * @returns An array containing the elements that were deleted.
	 */
	export function splice<T>(array: Array<T>, start: number, deleteCount: number, ...items: Array<T>): Array<T>;
}

declare namespace ObjectUtilities {
	/**
	 * Used to represent a nil value. Basically `null` from ECMAScript.
	 */
	export const None: unique symbol;

	/**
	 * Returns true if the values are the same value, false otherwise.
	 * @param value0 The first value.
	 * @param value1 The second value.
	 */
	export function is(value0: unknown, value1: unknown): boolean;

	/**
	 * Copy the values of all of the enumerable own properties from one or more source objects to a target object.
	 * Returns the target object.
	 */
	export function assign<A, B>(target: A, source: B): A & B;
	export function assign<A, B, C>(target: A, source1: B, source2: C): A & B & C;
	export function assign<A, B, C, D>(target: A, source1: B, source2: C, source3: D): A & B & C & D;
	export function assign<A, B, C, D, E>(target: A, source1: B, source2: C, source3: D, source4: E): A & B & C & D & E;
	export function assign<A, B, C, D, E, F>(
		target: A,
		source1: B,
		source2: C,
		source3: D,
		source4: E,
		source5: F,
	): A & B & C & D & E & F;
	export function assign(target: object, ...sources: Array<any>): any;

	/**
	 * Returns an array of key/values of the enumerable properties of an object
	 * @param object Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
	 */
	export function entries<T>(object: ReadonlyArray<T>): Array<[number, NonNullable<T>]>;
	export function entries<T>(object: ReadonlySet<T>): Array<[T, true]>;
	export function entries<K, V>(object: ReadonlyMap<K, V>): Array<[K, NonNullable<V>]>;
	export function entries<T extends object>(
		object: T,
	): keyof T extends never ? Array<[unknown, unknown]> : Array<[keyof T, NonNullable<T[keyof T]>]>;

	/**
	 * Returns the names of the enumerable properties and methods of an object.
	 * @param object Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
	 */
	export function keys<T>(object: ReadonlyArray<T>): Array<number>;
	export function keys<T>(object: ReadonlySet<T>): Array<T>;
	export function keys<K, V>(object: ReadonlyMap<K, V>): Array<K>;
	export function keys<T extends object>(object: T): keyof T extends never ? Array<unknown> : Array<keyof T>;

	/**
	 * Returns an array of values of the enumerable properties of an object
	 * @param object Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
	 */
	export function values<T>(object: ReadonlyArray<T>): Array<NonNullable<T>>;
	export function values<T>(object: ReadonlySet<T>): Array<true>;
	export function values<K, V>(object: ReadonlyMap<K, V>): Array<NonNullable<V>>;
	export function values<T extends object>(
		object: T,
	): keyof T extends never ? Array<unknown> : Array<NonNullable<T[keyof T]>>;

	/**
	 * Prevents the modification of attributes of existing properties, and prevents the addition of new properties.
	 * @param object Object on which to lock the attributes.
	 */
	export function seal<T extends object>(object: T): Readonly<T>;

	/**
	 * Prevents the modification of existing property attributes and values, and prevents the addition of new properties.
	 * @param object Object on which to lock the attributes.
	 */
	export function freeze<T extends object>(object: T): Readonly<T>;

	/**
	 * Prevents the addition of new properties to an object.
	 * @param object Object to make non-extensible.
	 */
	export function preventExtensions<T extends object>(object: T): T;

	/**
	 * Returns true if existing property attributes cannot be modified in an object and new properties cannot be added to the object.
	 * @param object Object to test.
	 */
	export function isSealed<T extends object>(object: T): object is Readonly<T>;

	/**
	 * Returns true if existing property attributes and values cannot be modified in an object, and new properties cannot be added to the object.
	 * @param object Object to test.
	 */
	export function isFrozen<T extends object>(object: T): object is Readonly<T>;
}

export interface InspectOptions {
	depth?: number;
}

/**
 * Pretty-print an object the same as {@link console.log} to a `string`
 *
 * @param value
 */
export function inspect(value: unknown, options?: InspectOptions): string;

declare class JsMap<K, V> {
	/**
	 * @returns the number of elements in the Map.
	 */
	public readonly size: number;

	public constructor(iterable?: Array<[K, V]> | JsMap<K, V> | Map<K, V>);

	/**
	 * Adds a new element with a specified key and value to the Map. If an element with the same key already exists, the element will be updated.
	 */
	public set(key: K, value: V): JsMap<K, V>;

	/**
	 * Returns a specified element from the Map object. If the value that is associated to the provided key is an object, then you will get a reference to that object and any change made to that object will effectively modify it inside the Map.
	 * @returns Returns the element associated with the specified key. If no element is associated with the specified key, undefined is returned.
	 */
	public get(key: K): V | undefined;

	/**
	 * Clears the map.
	 */
	public clear(): void;

	/**
	 * @returns true if an element in the Map existed and has been removed, or false if the element does not exist.
	 */
	public delete(key: K): boolean;

	/**
	 * Executes a provided function once per each key/value pair in the Map, in insertion order.
	 */
	public forEach(callback: (value: V, key: K, map: JsMap<K, V>) => void): void;
	public forEach<This extends object>(
		callback: (thisArgument: This, value: V, key: K, map: JsMap<K, V>) => void,
		thisArgument: This,
	): void;

	/**
	 * @returns boolean indicating whether an element with the specified key exists or not.
	 */
	public has(key: K): boolean;

	/**
	 * Returns an iterable of key, value pairs for every entry in the map.
	 */
	public entries(): IterableIterator<[K, V]>;

	/**
	 * Returns an iterable of keys in the map
	 */
	public keys(): IterableIterator<K>;

	/**
	 * Returns an iterable of values in the map
	 */
	public values(): IterableIterator<V>;
}

interface JavaScriptSet<T> {
	/**
	 * Appends a new element with a specified value to the end of the Set.
	 */
	add(value: T): this;
	clear(): void;

	/**
	 * Removes a specified value from the Set.
	 * @returns Returns true if an element in the Set existed and has been removed, or false if the element does not exist.
	 */
	delete(value: T): boolean;

	/**
	 * Executes a provided function once per each value in the Set object, in insertion order.
	 */
	forEach(callback: (value: T, value2: T, set: JavaScriptSet<T>) => void): void;
	forEach<This extends object>(
		callback: (thisArgument: This, value: T, value2: T, set: JavaScriptSet<T>) => void,
		thisArgument: This,
	): void;

	/**
	 * @returns a boolean indicating whether an element with the specified value exists in the Set or not.
	 */
	has(value: T): boolean;

	/**
	 * @returns the number of (unique) elements in Set.
	 */
	readonly size: number;
}
interface JsSetConstructor {
	new (iterable: string): JavaScriptSet<string>;
	new <T>(): JavaScriptSet<T>;
	new <T>(iterable: Array<T>): JavaScriptSet<T>;
	new <T>(iterable: JavaScriptSet<T>): JavaScriptSet<T>;
}
declare const JsSet: JsSetConstructor;

export { ArrayUtilities, JsMap, JsSet, ObjectUtilities };
