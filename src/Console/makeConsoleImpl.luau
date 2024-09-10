--!strict

local Collections = require(script.Parent.Parent.Collections)
local Map = Collections.JsMap
local inspect = Collections.inspect

type Map<K, V> = Collections.Map<K, V>

local GetService = game.GetService
local attemptedGetButFailed = false
local cached: LogService? = nil

local function GetLogService(): LogService?
	if cached or attemptedGetButFailed then
		return cached
	end

	local success, value = pcall(GetService, game, "LogService")
	if not success then
		attemptedGetButFailed = true
		return nil
	end

	cached = value
	return value
end

local INDENT = "  "

return function()
	local console = {}
	local indentDepth = 0

	local function indent()
		return string.rep(INDENT, indentDepth)
	end

	function console.log(content, ...)
		local message
		if type(content) == "string" then
			message = string.format(content, ...)
		else
			message = inspect(content)
		end
		print(indent() .. message)
	end

	function console.debug(content, ...)
		local message
		if type(content) == "string" then
			message = string.format(content, ...)
		else
			message = inspect(content)
		end
		print(indent() .. message)
	end

	function console.info(content, ...)
		local message
		if type(content) == "string" then
			message = string.format(content, ...)
		else
			message = inspect(content)
		end
		print(indent() .. message)
	end

	function console.warn(content, ...)
		local message
		if type(content) == "string" then
			message = string.format(content, ...)
		else
			message = inspect(content)
		end
		warn(indent() .. message)
	end

	function console.error(content, ...)
		-- JS' `console.error` doesn't interrupt execution like Lua's `error`,
		-- which is more similar to throwing an exception in JS.
		local message
		if type(content) == "string" then
			message = string.format(content, ...)
		else
			message = inspect(content)
		end
		warn(indent() .. message)
	end

	function console.group(content, ...)
		local message
		if type(content) == "string" then
			message = string.format(content, ...)
		else
			message = inspect(content)
		end
		print(indent() .. message)
		indentDepth = indentDepth + 1
	end

	function console.groupCollapsed(content, ...)
		-- There's no smart console, so this is equivalent to `console.group`
		local message
		if type(content) == "string" then
			message = string.format(content, ...)
		else
			message = inspect(content)
		end
		print(indent() .. message)
		indentDepth = indentDepth + 1
	end

	function console.groupEnd()
		if indentDepth > 0 then
			indentDepth = indentDepth - 1
		end
	end

	local startTimes: Map<string, number> = Map.new()
	function console.time(label: string?)
		local trueLabel = label or "default"
		if startTimes:has(trueLabel) then
			console.warn(`Timer '{trueLabel}' already exists`)
			return
		end

		startTimes:set(trueLabel, os.clock())
	end
	function console.timeEnd(label: string?)
		local trueLabel = label or "default"
		local finishTime = os.clock()
		local startTime = startTimes:get(trueLabel)

		if startTime == nil then
			console.warn(`Timer '{trueLabel}' does not exist`)
			return
		end

		console.log(`{trueLabel}: {(finishTime - startTime) * 1000} ms`)
		startTimes:delete(trueLabel)
	end

	function console.clear()
		local logService = GetLogService()
		if logService then
			pcall(function()
				logService:ClearOutput()
			end)
		end
	end

	return console
end
