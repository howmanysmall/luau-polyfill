--!optimize 2
--!strict

local NaN = 0 / 0

local function Number(value: unknown)
	if type(value) == "number" then
		return value
	end

	if type(value) == "string" then
		return tonumber(value) or NaN
	end

	return NaN
end

return Number
