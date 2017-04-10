Mirar sandbox.md para un entorno TICK

# Oficial
https://hub.docker.com/_/influxdb/

docker run -d -p 8086:8086 --name influx influxdb:alpine

cliente:
docker run --rm --link=influx -it influxdb:alpine influx -host influx



## Con ssl, configuracion propia y directorios locales
mkdir -p /home/rancher/influxdb/{var,etc}
docker run --rm influxdb:alpine influxd config > etc/influxdb.conf
modificar la conf para poner:
[monitor] store-enabled = false
[http]
  auth-enabled = true
  https-enabled = true
  https-certificate = "/etc/ssl/influxdb.pem"
  https-private-key = "/etc/ssl/influxdb.key"

He obtenido certificados con letsencrypt y puesto en /home/rancher/letsencrypt/xxx.duckdns.org

docker run -d -p 8086:8086 -v /home/rancher/influxdb/etc/influxdb.conf:/etc/influxdb/influxdb.conf:ro -v /home/rancher/letsencrypt/xxx.duckdns.org/fullchain.pem:/etc/ssl/influxdb.pem:ro -v /home/rancher/letsencrypt/xxx.duckdns.org/privkey.pem:/etc/ssl/influxdb.key:ro -v /home/rancher/influxdb/var:/var/lib/influxdb --name influx influxdb:alpine influxd -config /etc/influxdb/influxdb.conf





# Otros
Usar mi adrianlzt/influxdb


https://registry.hub.docker.com/u/systemli/influxdb/
Version: 0.8.6
Plugins: Graphite, CollectD

docker pull systemli/influxdb

# simple run of influxdb
docker run --rm -it -p 8083:8083 -p 8086:8086 systemli/influxdb:latest

# with linked ports for api, admin, graphite and collectd
# syslog linked into the container
# data persisted outside of the container in /opt/influxdb
docker run -d --name influxdb -p 8083:8083 -p 8086:8086 -p 2003:2003 -p 25826:25826 -v /dev/log:/dev/log -v /opt/influxdb:/data systemli/influxdb:latest


# Graphite y logs al syslog local
docker run -d --name influxdb -p 8083:8083 -p 8086:8086 -p 2003:2003 -v /dev/log:/dev/log systemli/influxdb:latest

Graphite y collectd están mal configurados por lo que no arrancarán.
