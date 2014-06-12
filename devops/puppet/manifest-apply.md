/usr/lib/ruby/site_ruby/1.8/puppet/application/apply.rb
  Tiene insertada la documentación.

Es el codigo como se describe el estado.
Estos ficheros se llaman manifest, y tiene la extension .pp

Podemos generarlos a partir de puppet resource ... > fichero.pp


Para aplicar localmente el estado de un fichero manifest
puppet apply fichero.pp
Puede que salgan un monton de warnings la primera vez que se ejecuta el comando.

También se puede hacer un apply a un directorio, cogerá los manifests en orden alfabético (version 3.5+?)
puppet apply dir/

Si hago un apply a un fichero .pp que es una clase, tengo que meter al final la linea "include nombreclase", si no, no se ejecutará.

Para hacer ejecucciones sin hacer cambios
puppet apply --noop fichero.pp
Mas verboso:
puppet apply --noop -v extraer.pp

Si no nos dice nada, es que está todo como se esperaba.


Generalmente hay que escribir los manifest, el "truco" de sacarlos con pupper resource no suele llegar muy lejos.


puppet apply -e "class {'nombre': var => 'valor', var2 => 'otro',}"


Si ejecutamos 'puppet apply' y no tenemos ningún fichero /etc/puppet/hiera.yaml, puppet irá únicamente a buscar al fichero:
/var/lib/hiera/common.yaml

Para pasarle una conf específica de hiera
puppet apply prueba.pp --hiera_config /tmp/hiera.yaml


Cambiar el modulepath
puppet apply --modulepath=/root/dev/modules ...


* --detailed-exitcodes:
  Provide transaction information via exit codes. If this is enabled, an exit
  code of '2' means there were changes, an exit code of '4' means there were
  failures during the transaction, and an exit code of '6' means there were both
  changes and failures.

