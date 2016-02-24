http://docs.icinga.org/latest/en/objectdefinitions.html#contact


Los contactos se utilizarán para enviar las alertas.
No se puede asociar un contacto a un hostgroup o servicegroup.
Los contactos se asocian a los servicios o a los hosts.
Si asociamos un contacto a un host, nos llegaran las alertas de todos los services de ese host.

MAL! Se asocian host (y/o services) a contacts o contact groups. No se puede asociar un contacto a un host

Podemos asignar a un host template nuestro contact, y ese host template al hostgroup del que queramos recibir alertas.
Podemos tener un host template vacío, solo con eso determinado, así en cada host asignaremos un host tempalte "de verdad", y luego el que usaremos para que nos avise al contacto que queramos


host_notification_options:

This directive is used to define the host states for which notifications can be sent out to this contact. Valid options are a combination of one or more of the following: d = notify on DOWN host states, u = notify on UNREACHABLE host states, r = notify on host recoveries (UP states), f = notify when the host starts and stops flapping, and s = send notifications when host or service scheduled downtime starts and ends. If you specify n (none) as an option, the contact will not receive any type of host notifications. Default: n.



service_notification_options:

This directive is used to define the service states for which notifications can be sent out to this contact. Valid options are a combination of one or more of the following: w = notify on WARNING service states, u = notify on UNKNOWN service states, c = notify on CRITICAL service states, r = notify on service recoveries (OK states), and f = notify when the service starts and stops flapping. If you specify n (none) as an option, the contact will not receive any type of service notifications. Default: n.
