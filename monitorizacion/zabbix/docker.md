https://github.com/zabbix/zabbix-docker

# Agent
https://hub.docker.com/r/zabbix/zabbix-agent/

docker run --name some-zabbix-agent -e ZBX_HOSTNAME="some-hostname" -e ZBX_SERVER_HOST="some-zabbix-server" -d zabbix/zabbix-agent:tag
docker run --name some-zabbix-server --link some-zabbix-agent:zabbix-agent -d zabbix/zabbix-server:latest
  passive
docker run --name some-zabbix-agent --link some-zabbix-server:zabbix-server -d zabbix/zabbix-agent:latest
  active
docker run --name some-zabbix-agent --link zabbix-server-pgsql:zabbix-server --privileged -d zabbix/zabbix-agent:latest
  privileged


# Server
All-in-one (appliance) DEPRECATED
docker run --name some-zabbix-appliance -p 80:80 -p 10051:10051 -d zabbix/zabbix-appliance:tag

Hay un bug (intenta usar /usr/libexec/resolveip para inicializar mysql, que no existe)
podman run --rm -it -P --entrypoint /sbin/tini docker.io/zabbix/zabbix-appliance:centos-4.0.18 -- bash -c ln -s /usr/bin/resolveip /usr/libexec/resolveip && /usr/bin/docker-entrypoint.sh



docker run --name zabbix-postgres -e POSTGRES_PASSWORD=postgres -d postgres
  postgres bbdd server
  crear database "zabbix"? parece que algunas versiones no la crea solo el server?
  docker exec -it -u postgres zabbix-postgres psql -c 'create database zabbix;'
docker run --name zabbix-server-pgsql --link zabbix-postgres:postgres -e DB_SERVER_HOST="postgres" -e POSTGRES_USER="postgres" -e POSTGRES_PASSWORD="postgres" -d zabbix/zabbix-server-pgsql:ubuntu-latest
  zabbix backend server
  creará la database zabbix y el schema en el arranque al no detectar ninguna database "zabbix"

## Web
docker run --name zabbix-web-nginx-pgsql --link zabbix-postgres:postgres --link zabbix-server-pgsql:zabbix-server -e DB_SERVER_HOST="postgres" -e POSTGRES_USER="postgres" -e POSTGRES_PASSWORD="postgres" -e ZBX_SERVER_HOST="zabbix-server" -e PHP_TZ="Europe/Madrid" -d -P zabbix/zabbix-web-nginx-pgsql:ubuntu-latest
  mirar con "docker ps" el puerto asignado a la interfaz web
  user: Admin
  pass: zabbix
