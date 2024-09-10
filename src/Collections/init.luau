--!strict
local Packages = script.Parent

local Array = require(script.Array)
local Map = require(script.Map)
local Object = require(script.Object)
local Set = require(script.Set)
local WeakMap = require(script.WeakMap)
local inspect = require(script.inspect)

local types = require(Packages.ES7Types)

export type Array<T> = types.Array<T>
export type Map<T, V> = types.Map<T, V>
export type Object = types.Object
export type Set<T> = types.Set<T>
export type WeakMap<T, V> = types.WeakMap<T, V>

return {
	ArrayUtilities = Array;
	ObjectUtilities = Object;
	JsMap = Map.Map;
	coerceToMap = Map.coerceToMap;
	coerceToTable = Map.coerceToTable;
	JsSet = Set;
	JsWeakMap = WeakMap;
	inspect = inspect;
}
