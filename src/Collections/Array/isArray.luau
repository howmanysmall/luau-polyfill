--!strict
return function(value: any): boolean
	if type(value) ~= "table" then
		return false
	end
	if next(value) == nil then
		-- an empty table is an empty array
		return true
	end

	local length = #value

	if length == 0 then
		return false
	end

	local count = 0
	local sum = 0
	for key in next, value do
		if type(key) ~= "number" or key % 1 ~= 0 or key < 1 then
			return false
		end

		count += 1
		sum += key
	end

	return sum == count * (count + 1) / 2
end
