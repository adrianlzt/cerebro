http://ruby-doc.org/core-2.0.0/Array.html

> a = [2,"asda",45]
> a << 4  <- es lo mismo que a.push 4
=> [2, "asda", 45, 4]

& interseccion de arrays
+ unir arrays
- diferencia de arrays

Acceso
array[3]

Ejemplo, tenemos un array con cuatro elementos hash. Cada elemento tiene hostname e ip.
Queremos sacar todas las ips en un string unidas por comas, excepto la de un nodo:
[{:hostname=>"monit",    :ip=>"172.16.32.10", :box=>"centos64_lxc"}, 
 {:hostname=>"percona1", :ip=>"172.16.32.11", :box=>"centos64_lxc"}, 
 {:hostname=>"percona2", :ip=>"172.16.32.12", :box=>"centos64_lxc"}, 
 {:hostname=>"percona3", :ip=>"172.16.32.13", :box=>"centos64_lxc"}]

> nodos.drop_while { |n| n[:hostname] == "monit" }.map { |node| node[:ip] }.join(",")
=> "172.16.32.11,172.16.32.12,172.16.32.13"

Cogemos los elementos del array excepto el que (drop_while) tenga como hostname "monit".
Luego hacemos un map para coger solo las ips.
Por último unimos esas ips con comas.


Array.delete_if {|x| CONDICION }
  Si CONDICION == true, NO devuelve ese elmento en el array retornado
  Si CONDICION == false, devuelve ese elmento en el array retornado

Array.delete_if {|x| CONDICION }.map{|x| x.delete}
  Si CONDICION == false, se borra el elemento

Obtener de "prod" los elementos que estén en ambos.
(Environment.find_by name: "prod").checks.delete_if {|c1| !(Environment.find_by name: "pre").checks.find_index { |c2| c1["name"] == c2["name"] } }.selec(:name)

Obtener solo los elementos de "prod" que no estén en "pre"
  Si el find_index devuelve un número (true), se saca del array de vuelta, por lo que solo devuelva los que no hagan match
(Environment.find_by name: "prod").checks.delete_if {|c1| (Environment.find_by name: "pre").checks.find_index { |c2| c1["name"] == c2["name"] } }.selec(:name)


CUIDADO con drop_while. Solo borra los elementos HASTA el primer elemento que devuelva nil o false, sin incluir este elemento.



Tamaño:
nodos.length


Inicializar array con valores
p = Array.[](Project.find_by name: 'm2m')

Chequeo vacío
[].empty?   #=> true


Buscar en un array un único elemento:
ary = [0, 4, 7, 10, 12]
ary.bsearch {|x| x >=   4 } #=> 4
  Parece que no funciona con objetos, usar el siguiente:

envto_hostgroups.find_index {|hg| hg.name == "nuevohostgroup"}

Buscar trozo de palabra en diccionario
envto_hostgroups.find_index {|hg| hg["name"].include? "nuevo"}


Buscar varios elementos:
[1,2,3,4,5].select { |num|  num.even?  }   #=> [2, 4]
  Devuelve un array empty si no encuentra nada
  Devuelve un array siempre, aunque haya un único elemento

Obtengo la lista de elementos comunes entre hgto.services y hgfrom.services
hgto.services.select {|st| hgfrom.services.find_index {|sf| st[:name] == sf[:name] } }

Eliminar elementos que no queramos:
a = [1, 2, 3, 4, 5, 0]
a.drop_while {|i| i < 3 }   #=> [3, 4, 5, 0]

a = a.drop_while {|i| i < 3 } # Dejamos en el array solo los elementos con la condición

# Uniq (con {|x| ...} a partir de la 1.9.3
c = [["student","sam"], ["student","george"], ["teacher","matz"]]
c.uniq! { |s| s.first } # => [["student", "sam"], ["teacher", "matz"]]

# Modifica el array c quitando el elemento {name: "check1", params: "-AAA"}, porque ya hay uno con nombre "check1"
c = [{name: "check1", params: "-s-d-r"},{name: "check2", params: "-123"},{name: "check1", params: "-AAA"},{name: "check4", params: "-ZZZ"}]
c.uniq! { |s| s[:name]}


# Buscar una palabra en un array, case insensitive
http://stackoverflow.com/questions/9333952/case-insensitive-arrayinclude
array.any?{ |s| s.casecmp(mystr)==0 }
  Nos dará true o false.

Para obtener contenido con regexp (mirar regex.md):
all_node_names.grep(re)

