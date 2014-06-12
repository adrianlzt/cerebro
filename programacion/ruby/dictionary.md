http://ruby-doc.org/core-2.0.0/Hash.html

Almacenamiento no ordenado de pares clave-valor (key-value)

Hash vacío:
books = {}

a = {:nombre => "adrian", :edad => 26, :gender => :male, "piso" => 6}
a["piso"]
a[:nombre]

Hash[[:a,:b],[:c,:d]] (as well as Hash[:a,:b,:c,:d])
produces {:a => :b, :c => :d}

Otra forma más simplificada:
a = {nombre: "adrian"}

books["Gravity's Rainbow"] = :splendid
Estamos rellenando el diccionario, asignando a cada libro un símbolo (symbol).
Los símbolos deben ser algo así como DEFINES. Solo se guardan una vez en memoria así que son más eficientes.
Si vamos a usar una palabra varias veces en un programa es mejor usar un símbolo.

books.length nos dice los elementos que tenemos en el diccionario.

books.keys nos devuelve las claves (sin los valores)
books.values nos devuelve solo los valores

h = Hash.new(0)
Todos las claves del hash h cogen por defecto el valor 0


Iterar:
apps.each { | clave, valor| puts "clave: #{clave}   valor: #{valor} }


Eliminar valores:
hash={"pepe" => 1, "juan" => "cosa"}
cuenta=hash.delete("pepe")
puts hash => {"juan" => "cosa"}
puts cuenta => 1


Añadir valores:
irb(main):002:0> a
=> {:name=>"hola"}
irb(main):003:0> a.merge!({monit: true})
=> {:name=>"hola", :monit=>true}


Borrar todos las keys de un array de diccionario menos uno
=> [{:name=>"una", :id=>1231, :class=>"asda"}, {:name=>"dos", :id=>33331231, :class=>"asda"}, {:name=>"tres", :id=>124531, :class=>"as"}]
irb(main):104:0> z.map { |n| Hash[:name,n[:name]] }
=> [{:name=>"una"}, {:name=>"dos"}, {:name=>"tres"}]

