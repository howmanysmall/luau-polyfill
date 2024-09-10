--!strict
return function(source: string): string
	return (string.gsub(source, "[%s]+$", ""))
end
