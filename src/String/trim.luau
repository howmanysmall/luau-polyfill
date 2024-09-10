--!strict

local function trimEnd(source: string): string
	return (string.gsub(source, "[%s]+$", ""))
end
local function trimStart(source: string): string
	return (string.gsub(source, "^[%s]+", ""))
end

return function(source: string): string
	return trimStart(trimEnd(source))
end
