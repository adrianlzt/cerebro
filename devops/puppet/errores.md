http://bitcube.co.uk/content/puppet-errors-explained

(Para sacar mensajes de error mirar fail.md)

Intento hacer un puppet apply y me dice:
Error: Puppet::Parser::AST::Resource failed with error ArgumentError: Could not find declared class postfix at line 1 on node localhost.localdomain

Comprobar con:
puppet apply --configprint modulepath
que tengo el modulo en el path.
Comprobar tambien que el nombre del directorio del módulo coincide con el que se define en class.


Error: Could not retrieve catalog from remote server: Error 400 on SERVER: Puppet::Parser::AST::Resource failed with error ArgumentError: Could not find declared class monitorizacion::basic at /etc/puppet/manifests/site.pp:83 on node client2.com
Volver a ejecutar puppet agent


Si al usar hiera como ENC nos sale el error:
Error: Could not retrieve catalog from remote server: Error 400 on SERVER: malformed format string - %S at /etc/puppet/manifests/site.pp:1 on node client

Puede que sea problema del hiera del puppetmaster, que no esté bien definido algún fichero.
Reiniciar el puppet master tras cambiar las cosas.

Hacer pruebas con el facter de producción para ver si falla.


Al conectar con el master: CRL is not yet valid for
El problema es que cliente y servidor no tienen la misma hora.


Al usar una función en el site.pp (hiera_resources) nos da el error: exception object expected at
Esto quiere decir que tenemos algún fallo de sintaxis. Probar a meter la clase o el defined type directamente en el nodo, y nos dirá donde está el error.
https://tickets.puppetlabs.com/browse/PUP-1100



Error: Could not retrieve catalog from remote server: Error 400 on SERVER: Puppet::Parser::AST::Resource failed with error ArgumentError: Cannot alias Package[postgresql-client] to ["postgresql"] at /etc/puppet/modules/postgresql/manifests/client.pp:12; resource ["Package", "postgresql"] already declared at /etc/puppet/modules/postgresql/manifests/client.pp:12 on node puppet.com
Warning: Not using cache on failed catalog
Error: Could not retrieve catalog; skipping run
Este error daba porque un manifest hacia un ensure_resource del package postgresql y luego el manifest client.pp lo volvía a definir. Parece que es un fallo de puppet.



err: Could not retrieve catalog from remote server: wrong header line format
One of your templates contains invalid syntax. Look for unintentional or invalid "<%" and ">%" strings. If you need to put these strings in templates you can use "<%%" and ">%%".


Exiting; no certificate found and waitforcert is disabled
rm -fr /var/lib/puppet/ssl



Error: /File[/var/lib/puppet/facts.d]: Failed to generate additional resources using 'eval_generate': Error 400 on SERVER: Not authorized to call search on /file_metadata/pluginfacts with {:ignore=>[".svn", "CVS", ".git"], :checksum_type=>"md5", :recurse=>true, :links=>"manage"}
Error: /File[/var/lib/puppet/facts.d]: Could not evaluate: Could not retrieve file metadata for puppet://puppet.service.dsn.inet/pluginfacts: Error 400 on SERVER: Not authorized to call find on /file_metadata/pluginfacts with {:source_permissions=>"use", :links=>"manage"}
Wrapped exception:
Error 400 on SERVER: Not authorized to call find on /file_metadata/pluginfacts with {:source_permissions=>"use", :links=>"manage"}
yum downgrade puppet-3.3.2
  El cliente puppet era 3.5.1 y el server 3.3.2


# puppet resource user root
Error: Could not run: SSL_connect returned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed: [Certname "" must not contain unprintable or non-ASCII characters]
rm -fr /var/lib/puppet/ssl
El problema es que antes habíamos conectado contra un puppetmaster, y el agente aún conserva el certificado y ve que no coincide.


Warning: Error 400 on SERVER: no 'environments' in ...
Problema al actualizar de puppet 3.x a puppet 3.6.1. El fichero auth.conf necesitaba la nueva versión que lleva:
path /v2.0/environments


SSL_connect returned=1 errno=0 state=SSLv3 read server session ticket A: sslv3 alert certificate revoked
rm -fr /var/lib/puppet/ssl/*
  en el cliente

Error: Could not retrieve catalog from remote server: execution expired
Creo que puede ser porque tarda mas de 100s en compilar el catalog.
Reiniciar puppetmaster.
Cambiar a unicorn (en vez de webrick)?


# java.lang.OutOfMemoryError: Java heap space
# -XX:OnOutOfMemoryError="kill -9 %p"
#   Executing /bin/sh -c "kill -9 5639"...
java.lang.OutOfMemoryError: Java heap space
Dumping heap to /var/log/puppetdb/puppetdb-oom.hprof ...
Heap dump file created [205618378 bytes in 1,726 secs]
  Aumentar el heap space. Mirar puppetdb-scaling.md
