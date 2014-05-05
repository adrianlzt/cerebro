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
