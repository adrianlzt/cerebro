https://hub.docker.com/_/postgres/
https://store.docker.com/images/postgres

Arrancar instancia de postgres:
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres

Cliente psql:
docker run -it --rm --link some-postgres:postgres postgres psql -h postgres -U postgres




# PostGIS
https://hub.docker.com/r/mdillon/postgis/

Arrancar postgres con postgis:
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d mdillon/postgis:latest
