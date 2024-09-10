local Error = require(script["Error.global"])
export type Error = Error.Error
return table.freeze({default = Error})
