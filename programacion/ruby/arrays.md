http://ruby-doc.org/core-2.0.0/Array.html

> a = [2,"asda",45]
> a << 4  <- es lo mismo que a.push 4
=> [2, "asda", 45, 4]

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

Tamaño:
nodos.length


Inicializar array con valores
p = Array.[](Project.find_by name: 'm2m')

Chequeo vacío
[].empty?   #=> true
