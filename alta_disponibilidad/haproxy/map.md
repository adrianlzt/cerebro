https://www.haproxy.com/blog/introduction-to-haproxy-maps/
https://cbonte.github.io/haproxy-dconv/1.6/configuration.html#7.3.1-map
mirar ejemplo_completo_con_mapeos_y_tls.config

map es un almacena de clave-valor (dict en python, map en go).
Se suelen usar para mantener de forma dinámica el mapeo frontend->backend.
Si modificamos el fichero directamente tendremos que hacer reload.
Pero podemos modificar estos ficheros haciendo uso de la api o con "http-request set-map", mirar abajo. (la versión enterprise tiene un módulo lb-update para actualizar los maps y acls)

Se pueden usar cuando las reglas "log format" aplican.
Sitios donde sí: use_backend, log-format, add-header, redirect, etc
Donde do: bind/server


# Estructura
clave valor

Comentarios en su propia línea empezando por "#".
Estos ficheros pueden ser muy grandes (millones de entradas) sin impacto de performance.


# Map converters
https://www.haproxy.com/documentation/hapee/1-8r1/onepage/#7.3.1-map
Serán las funciones que pondremos en la config para hacer uso de los maps:

map(<map_file>[,<default_value>])
map_<match_type>(<map_file>[,<default_value>])
map_<match_type>_<output_type>(<map_file>[,<default_value>])

Tenemos distintos "map", _beg, _end, _sub, _ip, _reg, _str para hacer distintos matches.
Cuidado que algunos no usan ebtree y pueden ser más lentos (leeran línea a línea).
map_ip, matchea una IP. Podemos poner máscaras de red (10.0.0.0/16). Es el de por defecto si pasamos una IP.
map_reg, usa las keys del mapa como expresiones regulares. No usa ebtree. Suena costoso.

Ejemplo:
Buscamos la key "example.com" en el map "/etc/hapee/maps/hosts.map", y es el valor que usaremos como backend.
use_backend %[str(example.com),map(/etc/hapee-1.8/maps/hosts.map)]

Podemos usar la cabecera HTTP Host (con default value "be_static"):
use_backend %[req.hdr(host),lower,map(/etc/hapee-1.8/maps/hosts.map,be_static)]



Search the input value from <map_file> using the <match_type> matching method, and return the associated value converted to the type <output_type>. If the input value cannot be found in the <map_file>, the converter returns the <default_value>. If the <default_value> is not set, the converter fails and acts as if no input value could be fetched. If the <match_type> is not set, it defaults to "str". Likewise, if the <output_type> is not set, it defaults to "str". For convenience, the "map" keyword is an alias for "map_str" and maps a string to another string.


Usamos ficheros externos para mapear cosas.
Por ejemplo, usamos el dominio (cabecera Host) para decidir a que backend de la configuración balancear:
use_backend be_http_%[base,map_reg(/var/lib/haproxy/conf/os_http_be.map)]

/var/lib/haproxy/conf/os_http_be.map:
^nodejs-ex-myproject\.192\.168\.99\.101\.nip\.io(|:[0-9]+)(|/.*)$ myproject_nodejs-ex

La regex permite que se pueda poner:
nodejs-ex-myproject.192.168.99.101.nip.io
nodejs-ex-myproject.192.168.99.101.nip.io:1234
nodejs-ex-myproject.192.168.99.101.nip.io:1234/cosas


Si cualquiera de esas cosas vienen en la cabecera "Host", se utilizará el backend: be_http_myproject_nodejs-ex




# http-request set-map
Solo modifica el proceso que coja la petición (nbproc).

Ejemplo para usar un HTTP GET para actualizar en memoria un map.
Solo lo permite si el source ip está en el rango 192.168.122.0/24

frontend fe_main
    bind :80
    acl in_network src 192.168.122.0/24
    acl is_map_add path_beg /map/add
    http-request set-map(/etc/hapee-1.8/maps/hosts.map) %[url_param(domain)] %[url_param(backend)] if is_map_add in_network

    # Esto devuelve un 200 si es una petición "/map/" (no la envía al backend)
    http-request deny deny_status 200 if { path_beg /map/ }
    use_backend %[req.hdr(host),lower,map(/etc/hapee-1.8/maps/hosts.map)]

HTTP GET que añadiría al map la key "example.com" con el value "be_static".
http://192.168.122.64/map/add?domain=example.com&backend=be_static


Para borrar usaríamos:
acl is_map_del path_beg /map/delete
http-request del-map(/etc/hapee-1.8/maps/hosts.map) %[url_param(domain)] if is_map_del in_network


Otra opción sería chequear el verbo HTTP (POST/PUT, DELETE)



# Blue-green deployment
Tendremos un map (/etc/hapee-1.8/maps/bluegreen.map) con:
active be_blue

Cuando queramos cambiar a green:
echo "set map /etc/hapee-1.8/maps/bluegreen.map active be_green" | socat stdio /var/run/hapee-1.8/hapee-lb.sock

