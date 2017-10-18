https://github.com/zabbix/zabbix-docker

# Agent
https://hub.docker.com/r/zabbix/zabbix-agent/

docker run --name some-zabbix-agent -e ZBX_HOSTNAME="some-hostname" -e ZBX_SERVER_HOST="some-zabbix-server" -d zabbix/zabbix-agent:tag
docker run --name some-zabbix-server --link some-zabbix-agent:zabbix-agent -d zabbix/zabbix-server:latest
  passive
docker run --name some-zabbix-agent --link some-zabbix-server:zabbix-server -d zabbix/zabbix-agent:latest
  active
docker run --name some-zabbix-agent --link some-zabbix-server:zabbix-server --privileged -d zabbix/zabbix-agent:latest
  privileged


# Server
docker run --name some-zabbix-server-pgsql -e DB_SERVER_HOST="some-postgres-server" -e POSTGRES_USER="some-user" -e POSTGRES_PASSWORD="some-password" -d zabbix/zabbix-server-pgsql:tag

## Web
docker run --name some-zabbix-web-nginx-pgsql --link some-zabbix-server:zabbix-server -e DB_SERVER_HOST="some-postgres-server" -e POSTGRES_USER="some-user" -e POSTGRES_PASSWORD="some-password" -e ZBX_SERVER_HOST="some-zabbix-server" -e PHP_TZ="some-timezone" -d zabbix/zabbix-web-nginx-pgsql:tag

docker run --name some-zabbix-web-nginx-pgsql --link some-postgres-server:postgres -e DB_SERVER_HOST="some-postgres-server" -e POSTGRES_USER="some-user" -e POSTGRES_PASSWORD="some-password" -e ZBX_SERVER_HOST="some-zabbix-server" -e PHP_TZ="some-timezone" -d zabbix/zabbix-web-nginx-pgsql:tag
