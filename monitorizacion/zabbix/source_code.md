GIT
https://git.zabbix.com/scm/zbx/zabbix.git

SVN (viejo)
https://zabbix.org/wiki/Get_Zabbix
svn co svn://svn.zabbix.com/trunk
svn co svn://svn.zabbix.com/branches/2.4
svn co svn://svn.zabbix.com/tags/3.0.1


Server escrito en C
Frontend PHP




# Desarrollo
https://www.zabbix.org/wiki/Docs/specs/development_guidelines

El desarrollo se realiza en branches que que cuelgan de dev/ donde el nombre esta asociado a un ID del jira de support.zabbix.com
Una vez terminado el desarrollo se mergea en trunk

Ejemplo:
https://support.zabbix.com/browse/ZBXNEXT-4002
svn://svn.zabbix.com/branches/dev/ZBXNEXT-4002


# Build
https://www.zabbix.org/wiki/Compilation_instructions#Creating_source_archive
https://github.com/zabbix/zabbix-docker/blob/3.4/server-pgsql/alpine/Dockerfile
https://www.zabbix.com/documentation/current/en/manual/installation/install

Podemos usar los Dockerfile para hacer el build


./bootstrap.sh
./configure --enable-server --enable-agent --with-postgresql --enable-ipv6 --with-net-snmp --with-libcurl --with-libxml2 --with-ssh2 --prefix=/opt/zabbix
  dependiendo de que queramos compilar (server, agent, proxy) y que backend (mysql, postgresql, etc), deberemos poner unas configuraciones u otras
  hay una opción para generar binarios estaticos (no recomendado, al menos para el server)
    --enable-static  (tampoco vale para hpux)
  --enable-agent si solo queremos compilar el agente
  para hpux y agente v4 necesitamos http://hpux.connect.org.uk/hppd/hpux/Languages/pcre-8.41/
  https://support.zabbix.com/browse/ZBX-15764?attachmentViewMode=list
  configure usado:
  CFLAGS="+DD64" ./configure --enable-agent --with-libpcre-include=/tmp/zabbix/pcre/pcre-INC/usr/local/include --with-libpcre-lib=/tmp/zabbix/pcre/pcre-RUN/usr/local/lib/hpux64/ --prefix=/tmp/zabbix/zabbix-4.0.7/empaquetar

make dbschema
make
make css
  necesita sass version 3.4.22
make install

./bootstrap.sh && ./configure --enable-server --enable-agent --with-postgresql --with-net-snmp --enable-ipv6 --with-net-snmp --with-libcurl --with-libxml2 --with-ssh2 --prefix=/opt/zabbix && make dbschema && make && make css && sudo make install

Cargar schema y datos en la bbdd:
psql -U zabbix -d zabbix -f database/postgresql/schema.sql
psql -U zabbix -d zabbix -f database/postgresql/images.sql
psql -U zabbix -d zabbix -f database/postgresql/data.sql



# Frontend
cd frontends/php
docker run --name zabbix-web-dev --rm -it -v "$PWD:/usr/share/zabbix" -e ZBX_SERVER_HOST=localhost -e DB_SERVER_HOST=localhost --net host zabbix/zabbix-web-nginx-pgsql:latest

http://localhost
user: Admin
password: zabbix
