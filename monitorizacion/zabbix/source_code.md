SVN
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
https://www.zabbix.com/documentation/4.0/manual/installation/install
https://github.com/zabbix/zabbix-docker/blob/3.4/server-pgsql/alpine/Dockerfile

Podemos usar los Dockerfile para hacer el build

./bootstrap.sh
./configure --enable-server --enable-agent --with-postgresql --with-net-snmp --enable-ipv6 --with-net-snmp --with-libcurl --with-libxml2 --with-ssh2 --prefix=/opt/zabbix
  dependiendo de que queramos compilar (server, agent, proxy) y que backend (mysql, postgresql, etc), deberemos poner unas configuraciones u otras
  hay una opción para generar binarios estaticos (no recomendado, al menos para el server)
    --enable-static  (tampoco vale para hpux)
  --enable-agent si solo queremos compilar el agente
make dbschema
make
make css
  necesita sass version 3.4.22
make install

./bootstrap.sh && ./configure --enable-server --enable-agent --with-postgresql --with-net-snmp --enable-ipv6 --with-net-snmp --with-libcurl --with-libxml2 --with-ssh2 --prefix=/opt/zabbix && make dbschema && make && make css && sudo make install


# Frontend
cd frontends/php
docker run --rm -it -v "$PWD:/var/www/html/" -p 80:80 richarvey/nginx-php-fpm:latest
