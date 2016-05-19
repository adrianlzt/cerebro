https://es.wikipedia.org/wiki/Transferencia_de_zona_DNS
https://technet.microsoft.com/en-us/library/cc781340(v=ws.10).aspx

# Zonas vs Dominios
Una zona comienza como autoridad de un dominio. Ej. pepe.com será una zona y dominio.

Cuando se cree un subdominio (aa.pepe.com) este podrá:
  - seguir perteneciendo a la misma zona
  - crear una nueva zona para este subdominio

La zona principal tendrá que mantener información de la delegación de un subdominio hacia otra zona.

Las zonas deben estar disponibles desde varios servidores de DNS para tener HA y fault tolerance.

# AXFR / IXFR

Cuando se añade un nuevo servidor DNS como secundario para una zona existente, el hace una zone transfer full (AXFR)

Para ir actualizando estos servidores secundarios se pueden hacer AXFR full o incrementales (IXFR) (si están soportadas por los servidores).
Estos IXFR se hacen mirando la version del SOA de cada zona. El primario debe mataner un histórico de cambios. Como parte positiva se transfieren menos datos, por lo tanto más rápido.

Los AXFR/IXFR siempre son iniciados por el servidor secundario.

Los servidores primarios solo harán AXFR a los servidores autorizados (que estén en la lista de name servers para dicha zona)

## Cuando suceden
Cuando el refresh interval expira (por defecto 900s = 15')
  Se consulta la SOA, si el serial number se ha incrementado, se inicia la AXFR/IXFR

Cuando un servidor secundario es notificado por un primario (dns notify)

Cuando se arranca un nuevo servidor secundario

Cuando desde el secundario se arranca una petición manual para hacer la transferencia.

## Solicitar un AXFR con dig
dig dominio.com. AXFR

Nos devolverá todos los records asociados a esa zona.
El SOA
Los NS
Y muchos A, AAAA, MX, etc


# DNS Notify
Es una notificación de los servidores primarios hacia los secundarios para que actualicen la zona.
