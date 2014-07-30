Escuchar entre Multisite y Livestatus.

0.- Instalar socat.

1.- Cambiar el socket al que escribe Multisite:
    /usr/share/multisite/htdocs/defaults.py
      livestatus_unix_socket      = '/tmp/live'

2.- Poner socat a escuchar en /tmp/live y escribir en el socket definido por icinga (/etc/icinga/modules/livestatus.cfg)
    socat -d -d -v unix-listen:/tmp/live,fork unix-connect:/var/spool/icinga/cmd/live
    chmod 777 /tmp/live

3.- Recargar apache
    service apache2 reload


Para volver a ejecutar socat pararemos apache, borraremos el /tmp/live y empezaremos de nuevo en el paso 2.
