http://ruby-doc.org/stdlib-1.9.3/libdoc/ostruct/rdoc/OpenStruct.html

An OpenStruct is a data structure, similar to a Hash, that allows the definition of arbitrary attributes with their accompanying values. This is accomplished by using Ruby’s metaprogramming to define methods on the class itself.

require 'ostruct'

person = OpenStruct.new
person.name    = "John Smith"
person.age     = 70
person.pension = 300

puts person.name     # -> "John Smith"
puts person.age      # -> 70
puts person.address  # -> nil


puts person.to_s
# Si esta vacio solo mostrara <OpenStruct>
# Si tiene valores: #<OpenStruct verbose=true, source_name="pepe">
