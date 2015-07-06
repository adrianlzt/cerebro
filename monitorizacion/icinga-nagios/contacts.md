Los contactos se utilizarán para enviar las alertas.
No se puede asociar un contacto a un hostgroup o servicegroup.
Los contactos se asocian a los servicios o a los hosts.
Si asociamos un contacto a un host, nos llegaran las alertas de todos los services de ese host.

MAL! Se asocian host (y/o services) a contacts o contact groups. No se puede asociar un contacto a un host

Podemos asignar a un host template nuestro contact, y ese host template al hostgroup del que queramos recibir alertas.
Podemos tener un host template vacío, solo con eso determinado, así en cada host asignaremos un host tempalte "de verdad", y luego el que usaremos para que nos avise al contacto que queramos

