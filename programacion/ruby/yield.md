http://www.tutorialspoint.com/ruby/ruby_blocks.htm

#!/usr/bin/ruby

def test
   yield 5
   puts "You are in the method test"
   yield 100
end
test {|i| puts "You are in the block #{i}"}
