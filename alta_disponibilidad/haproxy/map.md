https://cbonte.github.io/haproxy-dconv/1.6/configuration.html#7.3.1-map
mirar ejemplo_completo_con_mapeos_y_tls.config

map(<map_file>[,<default_value>])
map_<match_type>(<map_file>[,<default_value>])
map_<match_type>_<output_type>(<map_file>[,<default_value>])

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
