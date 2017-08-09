http://postgis.net/
https://davidcel.is/posts/distance-constraints-with-postgresql-and-postgis/

Extension de postgresql para operaciones con coordenadas

CREATE EXTENSION "postgis";

CREATE TABLE foraging_spots (
  id          SERIAL                 PRIMARY KEY,
  coordinates GEOGRAPHY(POINT, 4326) NOT NULL,
  nuts        INT
);

INSERT INTO foraging_spots (nuts, coordinates) VALUES (4, ST_GeographyFromText('POINT(-73.968504 40.779741)'));

SELECT name, ST_AsText(coordinates) FROM crags;

SELECT ST_Distance(coordinates, ST_GeographyFromText('POINT(-73.968504 41.779741)')) FROM crags;

SELECT name FROM crags WHERE ST_Distance(coordinates, ST_GeographyFromText('POINT(-73.968504 41.779741)')) < 200000;
En metros
