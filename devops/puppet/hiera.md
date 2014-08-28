http://docs.puppetlabs.com/hiera/1/hierarchy.html

"Base de datos" jerárquica donde se almacenan los parametros.

http://docs.puppetlabs.com/hiera/1/puppet.html#automatic-parameter-lookup
Cuando puppet va a aplicar un módulo consulta a hiera "nombremodulo::parametro", y si está es el valor que aplica.
Esto, separando por environments, osfamily (Debian y RedHat, importante las mayusculas), etc hace que no tengamos que definir prácticamente parámetros en los manifests.
CUIDADO! Si usamos esto todas las clases para las que valen esos parámetros se verán afectadas. Limitar por host si es necesario.

Instalación: puppet resource package hiera ensure=installed
Para que puppet vea hiera: ln -s /etc/hiera.yaml /etc/puppet/
Para el command line y ruby la localización por defecto sigue siendo /etc/hiera.yaml, por eso mejor un enlace simbólico.


El backend es el lenguaje en el que se almacenará los datos.
  JSON
  YAML
  Relational Databases: https://github.com/Telmo/hiera-mysql-backend
  NoSQL databases: Redis (http://carlasouza.com/puppetconf13/#/step-30)
  HTTP: https://github.com/crayfishx/hiera-http . CouchDB nos ofrece una interfaz web lista para interactuar con este backend
  GPG: https://github.com/crayfishx/puppet-gpg
  REST: https://github.com/binford2k/hiera-rest
  PuppetDB: https://github.com/dalen/puppet-puppetdbquery
    Podemos usar hiera para hacer queries a puppetdb y obtener información
  Mas: https://rubygems.org/search?utf8=%E2%9C%93&query=+hiera

El hierarchy es como buscar la variable, de arriba a abajo.
Primero buscaria en defaults, luego en clientcert, etc. En el primero que lo encuentre, parará.
Con el formato %{::clientcert} podemos hacer referencia a variables del facter.
Para buscar una variable en un manifest haremos:
  hiera(nombre)
  hiera_array(nombre)
  hiera_hash(nombre)

Mirar tambien enc_hiera.md

En los datadir existirá un fichero con los nombres que hemos definido en el hierarchy terminado con la extenison del backend.
Ej.:
/var/lib/hiera/global.yaml
/var/lib/hiera/debian.yaml (si hemos definido en hierarchy a %{osfamily} y somos un SO de familia debian)


Si ejecutamos 'puppet apply' puppet irá únicamente a buscar al fichero:
/var/lib/hiera/common.yaml

Si queremos que use un hiera.yaml
puppet apply --hiera_config /etc/puppet/hiera.yaml test.pp


/etc/puppet/hiera.yaml (tras modificarlo: /etc/init.d/puppetmaster restart)
Una mejor configuración para Puppet, usando además JSON (YAML parece que pasará a estar deprecated)
---
:backends:
  - json
:json:
  :datadir: /etc/puppet/hiera
:hierarchy:
  - "node/%{::fqdn}"
  - common


/etc/puppet/hiera/common.json
{
  "variable": "valor"
}


Para sacar las variables de hiera:
$pepe = hiera('dnsserver')
notify {"variable: ${pepe}":}

hiera('nombre','valor por defecto')


Si hiera('var') devuelve "cosa ${var}" ese ${var} se pondrá como un literal (no pondrá el valor de esa variable).
Pero si podemos hacer: hiera('var',"valor $variable")


Para definir las variables en los yaml:
apache-packages:
    - apache2
    - apache2-common
    - apache2-utils

# string
apache-service: apache2

# interpolated facter variable
hosts_entry: "sandbox.%{::fqdn}"

# hash
sshd_settings:
    root_allowed: "no"
    password_allowed: "yes"

# alternate hash notation
sshd_settings: {root_allowed: "no", password_allowed: "yes"}

# to return "true" or "false"
sshd_settings: {root_allowed: no, password_allowed: yes}



Para definir en JSON:
{
    "variable_booleana" : true,
    "apache-packages" : [
    "apache2",
    "apache2-common",
    "apache2-utils"
    ],

    "hosts_entry" :  "sandbox.%{::fqdn}",

    "sshd_settings" : {
                        "root_allowed" : "no",
                        "password_allowed" : "no"
                      }
}




Para debugear como intenta conseguir una variable:
hiera nombrevariable -d

Para ver el valor de una variable para un fqdn determinado:
hiera nombrevar ::fqdn=nombre.dominio

Para pasar un valor como array
hiera nombrevar ::grupo=["bla","cpe"] ??? Asi no funciona

Si queremos que use un entorno, osfamily, etc.
hiera dnsserver -d environment=pro

Si queremos ver todos los valores que nos devuelve (toda los valores recogidos en el hierachy) para el caso de que sean arrays
hiera -a valor ::hostname=prueba

Si queremos ver todos los valores que nos devuelve (toda los valores recogidos en el hierachy) para el caso de que sean hash
hiera -h valor ::hostname=prueba

Usar otro hiera.yaml
hiera acme_version --yaml /var/lib/puppet/yaml/facts/example.com.yaml

Devolver un valor por defecto si no se encuentra nada
hiera acme_version 'sites/%{location}'

# Templates
<%= scope.function_hiera(['graphite_node']) %>

## Develop ##
Read: https://github.com/puppetlabs/hiera/blob/master/CONTRIBUTING.md
Abrir ticket en jira: https://tickets.puppetlabs.com

git clone https://github.com/puppetlabs/hiera.git
cd hiera/
bundle
rake package:bootstrap
git co -b fix/master/que_hacemos
rake test
git push origin fix/master/que_hacemos


## Develop backend ##
Cuando definimos un backend intenta cargar: hiera/backend/nombre_backend.rb y la clase dentro del .rb debera llamarse Nombre_backend
Reiniciar puppetmaster tras hacer cambios en los backends.

Intentará cargar el backend desde todas las gemas instaladas y con las siguientes extensiones:
"/usr/lib/ruby/gems/1.8/gems/pg-0.17.1/lib/hiera/backend/postgres_backend"
"/usr/lib/ruby/gems/1.8/gems/pg-0.17.1/lib/hiera/backend/postgres_backend.rb"
"/usr/lib/ruby/gems/1.8/gems/pg-0.17.1/lib/hiera/backend/postgres_backend.rbw"
"/usr/lib/ruby/gems/1.8/gems/pg-0.17.1/lib/hiera/backend/postgres_backend.so"
"/usr/lib/ruby/gems/1.8/gems/pg-0.17.1/lib/hiera/backend/postgres_backend.bundle"
"/usr/lib/ruby/gems/1.8/gems/pg-0.17.1/lib/hiera/backend/postgres_backend.dll"
"/usr/lib/ruby/gems/1.8/gems/pg-0.17.1/lib/hiera/backend/postgres_backend.sl"
"/usr/lib/ruby/gems/1.8/gems/pg-0.17.1/lib/hiera/backend/postgres_backend.jar"


chown -R puppet.puppet /etc/puppet/hiera
require 'hiera'
require 'pp'
scope = {} #variables de facter que queramos pasar
#scope = {"::project" => "m2m"}
override = nil
type=:priority
#type=:hash
#type=:array
hiera = Hiera.new(:config => "/etc/puppet/hiera.yaml")
lk = hiera.lookup("commands", nil, scope, override, type)
pp(lk)

Función a la que llamamos
def lookup(key, default, scope, order_override=nil, resolution_type=:priority)

hiera_hash -> https://github.com/puppetlabs/puppet/blob/master/lib/puppet/parser/functions/hiera_hash.rb
hiera_array -> https://github.com/puppetlabs/puppet/blob/master/lib/puppet/parser/functions/hiera_array.rb
Llaman a lookup con type :hash o :array
