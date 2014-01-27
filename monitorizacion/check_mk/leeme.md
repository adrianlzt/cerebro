http://mathias-kettner.com/check_mk_introduction.html

Check_mk se compone de varias partes:

La principal es un sistema de chequeos mediante el cual con una sola petición al host a monitorear, el nos devuelve todos los resultados de los checks. Estos luegos son tratados en el lado monitorizador, troceados, y alimentan los checks típicos.
Check_mk también dispone de autodiscover, pudiendo mirar dentro del sistema que paquetes están instalados, y autogenerando una configuración para monitorizar todos esos servicios.
También dispone de mrpe, para migrar desde nrpe.

Otra parte de LiveStatus: http://mathias-kettner.de/checkmk_livestatus.html
Este es un broker para acceder a la información de monitorización a través de un socket (en vez de parsear los ficheros de nagios, o acceder a la base de datos creada con ido2db)

Y también disponen de una UI, multisite: http://mathias-kettner.de/checkmk_multisite.html
Esta se conecta a uno o varios broker LiveStatus para obtener la información
