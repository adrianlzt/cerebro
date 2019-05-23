https://cbonte.github.io/haproxy-dconv/2.0/configuration.html#7

Se usan como condicionales en las configuraciones para decidir si se puede seguir procesando valores.

Se puede modificar con la API (cuidado, solo en memoria, no modifica el fichero del que podemos estar leyendo).

acl <aclname> <criterion> [flags] [operator] [<value>] ...


# Ejemplos

Ip origen matchea una subred (y almacena en in_network un booleano):
acl in_network src 192.168.122.0/24

URL matchea un valor:
acl is_map_add path_beg /map/add


https://cbonte.github.io/haproxy-dconv/1.8/configuration.html#7.3.6-base
Matchear contra la "base" (host+path) con una regexp:
acl NOMBRE base,map_reg(/etc/haproxy/haproxy.d/route_http_redirect.map) -m found

ejemplo de base: "www.example.com/some/path"
