http://mathias-kettner.com/checkmk_multisite.html

Para configurar varios Icinga/Nagios para que aparezcan en la misma interfaz de Multisite:
sites = {
  "munich" : {
      "alias" : "Munich"
  },
  "paris": {
     "alias":          "Paris",
     "socket":         "tcp:192.168.33.10:50000",
     "url_prefix":     "http://192.168.33.10/",
   },
}

Si no definimos socket, se sobreentiende que es el localhost.


Las configuraciones las meteremos en ficheros separados dentro de multisite.d/fichero.mk

No es necesario reiniciar para ver los cambios en la interfaz


Configurar el socket de livestatus en multisite:
/usr/share/multisite/htdocs/defaults.py
livestatus_unix_socket      = '/var/spool/icinga/cmd/live'
