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
La difenrencia es que si a es nil el segundo dará error


Para arrays también:
a=[0,1,2]
a.each { i
puts i
}

Para hashes:
apps.each { | clave, valor| puts "clave: #{clave}   valor: #{valor} }


next sirve para saltar a la siguiente vuelta, es como break en otros lenguajes


Bucles con número de vuelta
[:foo, :bar, :baz].to_enum.with_index(1).each do |elem, i|
  puts "#{i}: #{elem}"
end

El index estamos diciendo que empieze en 1, pero si queremos luego coger de otro array[i] tiene que empezar en 0
