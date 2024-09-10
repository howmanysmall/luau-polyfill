--!strict

local Boolean = require(script.Boolean)
local Collections = require(script.Collections)
local Console = require(script.Console)
local Math = require(script.Math)
local Number = require(script.Number)
local String = require(script.String)
local Symbol = require(script.Symbol)
local Timers = require(script.Timers)
local types = require(script.ES7Types)

local AssertionError = require(script.AssertionError)
local Error = require(script.Error)
local PromiseModule = require(script.Promise)
local extends = require(script.extends)
local instanceof = require(script.InstanceOf)

export type Array<T> = types.Array<T>
export type AssertionError = AssertionError.AssertionError
export type Error = Error.Error
export type Map<T, V> = types.Map<T, V>
export type Object = types.Object

export type PromiseLike<T> = PromiseModule.PromiseLike<T>
export type Promise<T> = PromiseModule.Promise<T>

export type Set<T> = types.Set<T>
export type Symbol = Symbol.Symbol
export type Timeout = Timers.Timeout
export type Interval = Timers.Interval
export type WeakMap<T, V> = Collections.WeakMap<T, V>

return {
	Array = Collections.ArrayUtilities;
	ArrayUtilities = Collections.ArrayUtilities;
	AssertionError = AssertionError;
	Boolean = Boolean;
	console = Console;
	Error = Error.default;
	extends = extends;
	instanceof = instanceof;
	Math = Math;
	Number = Number;
	Object = Collections.ObjectUtilities;
	ObjectUtilities = Collections.ObjectUtilities;
	Map = Collections.JsMap;
	JsMap = Collections.JsMap;
	coerceToMap = Collections.coerceToMap;
	coerceToTable = Collections.coerceToTable;
	Set = Collections.JsSet;
	JsSet = Collections.JsSet;
	WeakMap = Collections.JsWeakMap;
	JsWeakMap = Collections.JsWeakMap;
	String = String;
	Symbol = Symbol;
	setTimeout = Timers.setTimeout;
	clearTimeout = Timers.clearTimeout;
	setInterval = Timers.setInterval;
	clearInterval = Timers.clearInterval;
	util = {
		inspect = Collections.inspect;
	};
}
