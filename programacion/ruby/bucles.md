irb(main):022:0> a=(1..3).map
=> #<Enumerator: 1..3:map>
irb(main):025:0> a.each do |n|
irb(main):026:1* puts "#{n}"
irb(main):027:1> end
1
2
3

Es lo mismo que
  for n in a
que
  a.each do |n|

Hay que tener cuidado si la variable "a" es nil ya que dará un error.
myArr.each { |item| p item } unless myArr.nil?

a && a.each do |x|
  puts x
end

a.each do |x|
  puts x
end unless a.nil?

Para arrays también:
a=[0,1,2]
a.each { i
puts i
}

Para hashes:
apps.each { | clave, valor| puts "clave: #{clave}   valor: #{valor} }


next sirve para saltar a la siguiente vuelta, es como break en otros lenguajes
Jumps to next iteration of the most internal loop. Terminates execution of a block if called within a block (with yield or call returning nil).


Bucles con número de vuelta
[:foo, :bar, :baz].to_enum.with_index(1).each do |elem, i|
  puts "#{i}: #{elem}"
end

El index estamos diciendo que empieze en 1, pero si queremos luego coger de otro array[i] tiene que empezar en 0
