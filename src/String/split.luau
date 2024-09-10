--!strict

local findOr = require(script.Parent.findOr)
local slice = require(script.Parent.slice)
local types = require(script.Parent.Parent.ES7Types)
local MAX_SAFE_INTEGER = require(script.Parent.Parent.Number).MAX_SAFE_INTEGER

type Array<T> = types.Array<T>

type Pattern = string | Array<string>

local function split(str: string, _pattern: Pattern?, _limit: number?): Array<string>
	if _pattern == nil then
		return {str}
	end

	if _limit == 0 then
		return {}
	end

	local limit = if _limit == nil or _limit < 0 then MAX_SAFE_INTEGER else _limit
	local pattern = _pattern
	local patternList: Array<string>
	if type(pattern) == "string" then
		if pattern == "" then
			local result = {}
			for c in string.gmatch(str, ".") do
				table.insert(result, c)
			end
			return result
		end

		patternList = {pattern}
	else
		patternList = pattern :: Array<string>
	end

	local init = 1
	local result = {}
	local lastMatch
	local strLen, invalidBytePosition = utf8.len(str)
	if strLen == nil then
		error(string.format("string `%*` has an invalid byte at position %*", str, tostring(invalidBytePosition)))
	end

	repeat
		local match = findOr(str, patternList, init)
		if match ~= nil then
			table.insert(result, slice(str, init, match.index))
			local matchLength = utf8.len(match.match)
			-- Luau FIXME? Luau doesn't understand that str has already been shown to be valid utf8 on line 26 and therefore won't be nil
			init = match.index + matchLength :: number
		else
			table.insert(result, slice(str, init, nil))
		end
		if match ~= nil then
			lastMatch = match
		end
	until match == nil or init > strLen or #result >= limit
	if lastMatch ~= nil then
		local lastMatchLength, invalidBytePosition_ = utf8.len(lastMatch.match)

		if lastMatchLength == nil then
			error(
				string.format(
					"string `%*` has an invalid byte at position %*",
					lastMatch.match,
					tostring(invalidBytePosition_)
				)
			)
		end

		if lastMatch.index + lastMatchLength == strLen + 1 then
			table.insert(result, "")
		end
	end
	return result
end

return split
