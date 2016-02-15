-- Tipado dinámico

num = 42  -- All numbers are doubles.
s = 'walternate'  -- Immutable strings like Python.
t = "double-quotes are also fine"
u = [[ Double brackets
       start and end
       multi-line strings.]]
t = nil  -- Undefines t; Lua has garbage collection.

-- Undefined variables return nil.
-- This is not an error:
foo = anUnknownVariable  -- Now foo = nil.


aBoolValue = falseo
-- Only nil and false are falsy; 0 and '' are true!
if not aBoolValue then print('twas false') end


-- _G is a special table of all globals.
print(_G['_G'] == _G)  -- Prints 'true'.


-- string
-- http://lua-users.org/wiki/StringLibraryTutorial
