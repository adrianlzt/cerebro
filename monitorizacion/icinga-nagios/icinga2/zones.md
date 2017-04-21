Las zonas son como divide Icinga2 las configuraciones.

Dos master compartiendo la misma zona será una configuración HA.

Tambien puede haber un mater y varios satellite. Los master pasan config a los satelites.
Los satelites ejecutan los checks.

El otro rol es de cliente.


Each checkable host or service object is assigned to one zone only

Si usamos director + clientes con el wizard parece que gestiona todo solo.


# Comunicación
The underlying protocol uses JSON-RPC event notifications exchanged by nodes. The connection is secured by TLS. The message protocol uses an internal API, and as such message types and names may change internally and are not documented.


