https://github.com/phaag/nfdump

nfdump is a toolset in oder to collect and process netflow and sflow data, sent from netflow/sflow compatible devices. The toolset supports netflow v1, v5/v7,v9,IPFIX and SFLOW. nfdump supports IPv4 as well as IPv6.

Donde se almacenan los datos:
/var/cache/nfdump

Si corre con -e deberia borrar datos cuando la ocupación del disco supere el 95% (creo)
Tambien existe la utilidad nfexpire que podemos lanzar manualmente para limpiar.
No veo que ninguna de estas dos opciones esté configurada
Pero parece que está limitado a una ocupación máxima de 5GB

Modificar el watermark (por defecto esta al 95%)
nfexpire -u /var/cache/nfdump/flows//live/B603951313664FDAA5DBBB011574F4B2 -w 50

Consultar el estado del directorio donde se almacenan los datos:
nfexpire -l /var/cache/nfdump/flows//live/B603951313664FDAA5DBBB011574F4B2

Limpiar hasta que solo ocupen los datos 2GB:
nfexpire -e /var/cache/nfdump/flows//live/B603951313664FDAA5DBBB011574F4B2 -s 2g


