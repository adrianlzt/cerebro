http://postgis.net/
https://davidcel.is/posts/distance-constraints-with-postgresql-and-postgis/

Extension de postgresql para operaciones con coordenadas

CREATE EXTENSION "postgis";

CREATE TABLE foraging_spots (
  id          SERIAL                 PRIMARY KEY,
  coordinates GEOGRAPHY(POINT, 4326) NOT NULL,
  nuts        INT
);

CUIDADO! Los puntos se pasan como: logitud latitud.
Generalmente los tenemos al reves: lat,lon

Si hemos cargado los datos al reves podemos darles la vuelta con una función:
http://postgis.net/2013/08/18/tip_lon_lat/
ALTER TABLE crags ALTER COLUMN coordinates TYPE geography(Point,4326) USING ST_FlipCoordinates(coordinates::geometry)::geography(Point,4326);ALTER TABLE


INSERT INTO foraging_spots (nuts, coordinates) VALUES (4, ST_GeographyFromText('POINT(-73.968504 40.779741)'));

SELECT name, ST_AsText(coordinates) FROM crags;
SELECT name, ST_X( coordinates::geometry) AS latitud, ST_Y(coordinates::geometry) as longitud from crags;

SELECT ST_Distance(coordinates, ST_GeographyFromText('POINT(-73.968504 41.779741)')) FROM crags;

SELECT name FROM crags WHERE ST_Distance(coordinates, ST_GeographyFromText('POINT(-73.968504 41.779741)')) < 200000;
En metros


Coordenadas que caigan dentro de un cuadrado (recordar que las coordenadas son lon,lat):
SELECT name from crags WHERE coordinates && ST_MakeEnvelope(-4,40.9,-3.3,40.4);

Mostrar las coordenadas en formato latitud/longitud:
ST_AsText(xxx)

Si lo queremos al revés:
ST_AsText(ST_FlipCoordinates(xxx))


# Errores

## Input geometry has unknown (0) SRID
No tiene definido la metadata con el sistema de referencia espacial
http://postgis.net/docs/manual-2.0/ST_SetSRID.html

Podemos ponerlo a mano con, ejemplo:
ST_SetSRID(ST_Point(-123.365556, 48.428611),4326)

Podemos buscar el SRID por nombre en https://epsg.io/

Por ejemplo, para UTM 30N buscamos "UTM zone 30N"

Para ese el código ETRS89 es 25830.
