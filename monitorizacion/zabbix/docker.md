# Agent
https://hub.docker.com/r/zabbix/zabbix-agent/

docker run --name some-zabbix-agent -e ZBX_HOSTNAME="some-hostname" -e ZBX_SERVER_HOST="some-zabbix-server" -d zabbix/zabbix-agent:tag
docker run --name some-zabbix-server --link some-zabbix-agent:zabbix-agent -d zabbix/zabbix-server:latest
  passive
docker run --name some-zabbix-agent --link some-zabbix-server:zabbix-server -d zabbix/zabbix-agent:latest
  active
docker run --name some-zabbix-agent --link some-zabbix-server:zabbix-server --privileged -d zabbix/zabbix-agent:latest
  privileged
