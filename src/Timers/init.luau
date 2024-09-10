--!strict
local Packages = script.Parent
local Object = require(Packages.Collections).ObjectUtilities

local makeIntervalImpl = require(script.makeIntervalImpl)
local makeTimerImpl = require(script.makeTimerImpl)

export type Timeout = makeTimerImpl.Timeout
export type Interval = makeIntervalImpl.Interval

return Object.assign({}, makeTimerImpl(task.delay), makeIntervalImpl(task.delay))
