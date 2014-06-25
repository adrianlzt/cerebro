Cuidado! No recomendable!
Los comandos deben ser idempotentes.

Puede usarse para ejecutar algún script personal, descomprimir un tar.gz, instalar un driver binario...
Para no tener problemas de idempotencia, se le pueden poner triggers para que no se ejecute si hay alguna condición.
Ejemplo, creates => "/var/blabla/file", haría que si existe este fichero el exec no se ejecute.
Ese fichero lo deberemos crear nosotros, por ejemplo con command => "cosa a ejecutar && touch fichero"

onlyif. Si la salida es 0 ejecuta el script, si no, no lo ejecuta. ejemplos: http://www.puppetcookbook.com/posts/exec-onlyif.html
exec { "logrotate":
	path   => "/usr/bin:/usr/sbin:/bin",
	onlyif => "test `du /var/log/messages | cut -f1` -gt 100000"
}
Ejecuta si el tamaño del fichero es mayor de 100000 lineas.

unless. Como onlyif, pero al reves. Si es 0 ejecuta, resto, no ejecuta.

Ejecuta el comando si no existe el fichero .list
exec { 'add-collectd-repo' :
  command => "add-apt-repository -y ppa:vbulax/collectd5",
  creates => "/etc/apt/sources.list.d/vbulax-collectd5-precise.list",
  #unless => '/usr/bin/test -f /etc/apt/sources.list.d/vbulax-collectd5-precise.list',
}

Solo hace apt-get update si los repos tienen más de 1 dia de antiguedad
exec { 'update_repos' : 
  command => "apt-get update",
  onlyif => '/usr/bin/test $(( $(date +%s) - $(stat -c %Z /var/cache/apt/pkgcache.bin) )) -gt $(( 24 * 60 * 60 ))',
}



refreshonly. solo se ejecuta si se lo pide otro módulo.
Ej.: tras crear un paquete, que se ejecute un comando (newaliases tras mailman por ejemplo)

file {'/etc/apache/httpd.conf':
  content => 'puppet:///modulo/httpd.conf',
  notify => Exec['reload-apache'],
}

exec {'reload-apache':
  command => '/usr/bin/apache reload',
  refreshonly => true,
}

exec {'change-execution-dir':
  cwd => '/tmp',
  command => '/bin/touch test',
}

Exec {
  path => '/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin',
}



Definir variables de entorno
environment => ["FOO=bar"],
