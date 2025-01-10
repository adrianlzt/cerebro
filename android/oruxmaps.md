# Mapas

<http://www.oruxmaps.com/cs/index.php/maps>

## WMS

Podemos con conectar con servicios WMS que ofrecen mapas.

Si queremos montar el nuestro propio mirar mapserver_wms.md

Metiendo desde la app el WMS no me ha funcionado, se queja de que no encuentra capas compatibles y que compruebe el sistema de coordenadas.
Tal vez sea por algún problema de que versión se usa, 1.1.1, vs 1.3.0.

Lo que hice fue editar a mano el fichero /storage/emulated/0/Android/data/com.orux.oruxmapsDonate/files/oruxmaps/mapfiles/wms_services.xml y meter mi entrada.
Luego recargar los mapas disponibles.
