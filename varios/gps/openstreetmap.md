http://www.openstreetmap.org/export#map=19/42.69107/-0.37410
Mapas libres


API para buscar con más potencia
http://overpass-turbo.eu/

Poemos intentar usar el "wizard" para intentar escribir lo que queremos.
Si no lo pilla, tendremos que currarnos la query.

Ejemplo básico:
node
  [amenity=drinking_water]
  ({{bbox}});
out;

O especificando coordenadas:
node
  [amenity=drinking_water]
  (40.08087486638645,-2.128751277923584,40.08304201386734,-2.12310254573822);
out;

Podemos descargar los datos en varios formatos, entre ellos .osm, que luego podemos importar en postgres



# Editar mapas
JOSM
iD

Añadir fuentes de agua potable
https://wiki.openstreetmap.org/wiki/Tag:amenity=drinking%20water?uselang=en

Si nos referimos a fuentes decorativas (se les puede añadir un tag para marcarlas como potable)
https://wiki.openstreetmap.org/wiki/Tag:amenity=fountain?uselang=en




# StreetComplete
https://wiki.openstreetmap.org/wiki/StreetComplete
Android app which finds wrong, incomplete or extendable data in the user's vicinity and provides them the tools to complete these easily and directly on site without having to use another editor



# API
XML: read only
RESTful: Version 0.6, para lectura/escritura. Solo permite bajar en pequeñas porciones.
Overpass API: complex queries, read only

## python
https://wiki.openstreetmap.org/wiki/OSMPythonTools


## Javascript
mirar programacion/javascript/leaflet.md



# OSM Tools

## download from openstreetmap
https://wiki.openstreetmap.org/wiki/Downloading_data
Varias formas disponibles:

https://wiki.openstreetmap.org/wiki/API_v0.6#Retrieving_map_data_by_bounding_box:_GET_.2Fapi.2F0.6.2Fmap
GET /api/0.6/map?bbox=left,bottom,right,top
wget -O muenchen.osm "https://api.openstreetmap.org/api/0.6/map?bbox=11.54,48.14,11.543,48.145"

Podemos usar tambien overpass-turbo


## osm2pgsql
https://osm2pgsql.org/doc/manual.html
Disponible en AUR

Importar datos de openstreetmap en una postgresql/postgis.
Necesitamos un fichero osm con los datos.


La db donde vayamos a importar los datos necesita las extensiones:
CREATE EXTENSION postgis;
CREATE EXTENSION hstore;

En la tabla planet_osm_point se meteran los puntos. En la columna WAY tendremos la localización.

El formato de las tablas está definido en /usr/share/osm2pgsql/default.style
Si en el fichero .osm tenemos datos no estandar (tags custom), no se importarán.
Podemos añadir esas tags al fichero y reimportar con (ejemplo con el fichero style modificado en extended.style):
osm2pgsql amenity_fountain.osm --style extended.style


Cada ejecución borra los datos e importa de nuevo.

Si queremos hacer append usar: --append




## GDAL/ogr2ogr
Data conversion
Raster & vector formats

## Osmconvert
Conversion between formats (OSM XML, PBF, o5m, GeoJSON)

## overpass turbo
Data retrieval
query language
show on map
output as data



# Routing libraries
OSRM
OpenRouteService
MapBox
Route360.net

Para generar los recorridos a pie/bici/coche/transporte público para ir de un sitio a otro.
