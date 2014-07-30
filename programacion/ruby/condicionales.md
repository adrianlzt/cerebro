http://www.tutorialspoint.com/ruby/ruby_if_else.htm

if x > 2
   puts "x is greater than 2"
elsif x <= 2 and x!=0
   puts "x is 1"
else
   puts "I can't guess the number"
end

if !(a==b and c==d)
  ...
end

Operador ternario:
var == 10 ? "10" : "Not 10"

if "asda".is_a? String;  puts "string";  else; puts "no";  end


case a
when 1..5
  puts "It's between 1 and 5"
when 6
  puts "It's 6"
when String
  puts "You passed a string"
else
  puts "You gave me #{a} -- I have no idea what to do with that."
end
