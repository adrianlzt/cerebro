irb(main):022:0> a=(1..3).map
=> #<Enumerator: 1..3:map>
irb(main):025:0> a.each do |n|
irb(main):026:1* puts "#{n}"
irb(main):027:1> end
1
2
3

Para arrays también:
a=[0,1,2]
a.each { i
puts i
}

Para hashes:
apps.each { | clave, valor| puts "clave: #{clave}   valor: #{valor} }


next sirve para saltar a la siguiente vuelta, es como break en otros lenguajes
