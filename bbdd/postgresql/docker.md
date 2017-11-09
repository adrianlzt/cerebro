https://hub.docker.com/_/postgres/
https://store.docker.com/images/postgres

Arrancar instancia de postgres:
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres

Cliente psql:
docker run -it --rm --link some-postgres:postgres postgres psql -h postgres -U postgres
docker exec -it guacamole-postgres psql -U postgres -c "SELECT 1;"

Crear usuario:
docker exec -it guacamole-postgres createuser -U postgres -DRSP guacamole_user
docker exec -it guacamole-postgres psql -U postgres -c "GRANT ALL ON DATABASE aaa TO guacamole_user;"


Backup:
docker run -it --rm --link some-postgres:postgres -v /home/rancher:/dump postgres pg_dump -h postgres -U postgres -v -Fc --no-privileges --no-owner -d postgres -f /dump/database.pgdump


Restore:
docker run -it --rm --link some-postgres:postgres -v "$PWD:/dump" postgres pg_restore -h postgres -U postgres -v -e -Fc  --no-privileges --no-owner -d postgres /dump/database.pgdump
docker run -it --rm --link guacamole-postgres:postgres -v "$PWD:/dump" postgres psql -h postgres -U postgres -d guacamole_db -f /dump/initdb.sql



# PostGIS
https://hub.docker.com/r/mdillon/postgis/

Arrancar postgres con postgis:
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d mdillon/postgis:latest
