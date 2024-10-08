--!strict

--# selene: allow(empty_if)

local __DEV__ = _G.__DEV__
local Array = script.Parent
local Packages = Array.Parent.Parent
local isArray = require(Array.isArray)
local types = require(Packages.ES7Types)
type Array<T> = types.Array<T>

local RECEIVED_OBJECT_ERROR = "Array.concat(...) only works with array-like tables but "
	.. "it received an object-like table.\nYou can avoid this error by wrapping the "
	.. "object-like table into an array. Example: `concat({1, 2}, {a = true})` should "
	.. "be `concat({1, 2}, { {a = true} }`"

-- capture two separate generic arguments so that the type error in abuse cases is actionable, but needs CLI-49876 to avoid a false negative
local function concat<T, S>(source: Array<T> | T, ...: Array<S> | S): Array<T> & Array<S>
	local array
	local elementCount = 0

	if isArray(source) then
		array = table.clone(source :: Array<T>)
		elementCount = #(source :: Array<T>)
	else
		elementCount += 1
		array = {}
		array[elementCount] = source :: T
	end

	for index = 1, select("#", ...) do
		local value = select(index, ...)
		if value == nil then
			-- do not insert nil
		elseif type(value) == "table" then
			-- deviation: assume that table is an array, to avoid the expensive
			-- `isArray` check. In DEV mode, we throw if it is given an object-like
			-- table.
			if __DEV__ then
				if not isArray(value) then
					error(RECEIVED_OBJECT_ERROR)
				end
			end
			for k = 1, #value do
				elementCount += 1
				array[elementCount] = value[k]
			end
		else
			elementCount += 1
			array[elementCount] = value
		end
	end

	return (array :: any) :: Array<T> & Array<S>
end

return concat
