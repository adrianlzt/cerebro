(Para sacar mensajes de error mirar fail.md)

Intento hacer un puppet apply y me dice:
Error: Puppet::Parser::AST::Resource failed with error ArgumentError: Could not find declared class postfix at line 1 on node localhost.localdomain

Comprobar con:
puppet apply --configprint modulepath
que tengo el modulo en el path.
Comprobar tambien que el nombre del directorio del módulo coincide con el que se define en class.




Si al usar hiera como ENC nos sale el error:
Error: Could not retrieve catalog from remote server: Error 400 on SERVER: malformed format string - %S at /etc/puppet/manifests/site.pp:1 on node client

Puede que sea problema del hiera del puppetmaster, que no esté bien definido algún fichero.
Reiniciar el puppet master tras cambiar las cosas.

Hacer pruebas con el facter de producción para ver si falla.


Al conectar con el master: CRL is not yet valid for
El problema es que cliente y servidor no tienen la misma hora.
