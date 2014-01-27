http://ruby-doc.org/core-2.0.0/Array.html#method-i-map

The map method cycles through an array and replaces each item with something new.

irb(main):001:0> a = [ "a", "b", "c", "d" ]
=> ["a", "b", "c", "d"]
irb(main):002:0> a.map { |x| x + "!" }
=> ["a!", "b!", "c!", "d!"]
irb(main):003:0> a
=> ["a", "b", "c", "d"]
