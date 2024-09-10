--!strict
local function slice(str: string, startIndexStr: string | number, lastIndexStr: (string | number)?): string
	local strLen, invalidBytePosition = utf8.len(str)
	if strLen == nil then
		error(string.format("string `%*` has an invalid byte at position %*", str, tostring(invalidBytePosition)))
	end

	local startIndex = tonumber(startIndexStr)
	if type(startIndex) ~= "number" then
		error("startIndexStr should be a number")
	end

	if startIndex + strLen < 0 then
		-- then |start index| is greater than string length
		startIndex = 1
	end

	if startIndex > strLen then
		return ""
	end

	-- if no last index length set, go to str length + 1
	local lastIndex = strLen + 1
	if lastIndexStr ~= nil then
		-- ROBLOX FIXME: add parseInt to encapsulate this logic and use it here
		local NaN = 0 / 0
		lastIndex = tonumber(lastIndexStr) or NaN -- this works because 0 is truthy in Lua
	end
	if type(lastIndex) ~= "number" then
		error("lastIndexStr should convert to number")
	end

	if lastIndex > strLen then
		lastIndex = strLen + 1
	end

	local startIndexByte = utf8.offset(str, startIndex) :: number
	-- get char length of charset retunred at offset
	local lastIndexByte = utf8.offset(str, lastIndex) :: number - 1

	return string.sub(str, startIndexByte, lastIndexByte)
end

return slice
