Centos6.4

http://www.shinken-monitoring.org/wiki/shinken_10min_start
http://www.shinken-monitoring.org/wiki/offcial/install_script

Antes de hacer "./install -i" deberemos instalar el paquete:
yum install -y redhat-lsb.x86_64


La instalación de shinken instalará:
 Installing epel-release-6-8.noarch.rpm
 Installing gcc python sqlite-devel python-devel git mysql-devel python-setuptools nmap unzip python-ldap python-paste python-pycurl net-snmp-python net-snmp mysql-libs 
 Module paramiko (paramiko) not found. Installing...
 Module pymongo (pymongo) not found. Installing...
 Module netifaces (netifaces) not found. Installing...
 Module simplejson (simplejson) not found. Installing...
 Module pysqlite found.
 Module MySQL-python (MySQLdb) not found. Installing...
 Module pyro (Pyro.core) not found. Installing...
 Module kombu (kombu) not found. Installing...

Sep 11 16:16:12 Installed: mongo-10gen-2.4.6-mongodb_1.x86_64
Sep 11 16:16:13 Installed: mongo-10gen-server-2.4.6-mongodb_1.x86_64
MongoDB es para SkonfUI beta and WebUI


Al intentar instalar dio un problema cuando intentó instalar ciertas librerias de python.
Desistale shinken (./install -u), borre el easy_install (yum erase python-setuptools), lo volví a instalar (yum install python-setuptools) y shinken ya se instaló correctamente (./install -i)

Por defecto:
 --> ETC=/usr/local/shinken/etc
 --> VAR=/usr/local/shinken/var
 --> LIBEXEC=/usr/local/shinken/libexec
 --> TARGET=/usr/local/shinken

Crea usuario shinken.

Mete una entrada en el sudoers:
shinken ALL=(ALL) NOPASSWD: /usr/bin/nmap


| The Web Interface is available at: http://localhost:7767
| The default credentials for the webui are admin/admin


Te avisa de que permitas a localhost recorrer todo el arbol snmp. Esto supongo que será para hacer el auto-discover.


Para terminar la instalación deberemos instalar los plugins y los modulos que queramos. Siguiendo la web:
./install -p nagios-plugins &&\
./install -p check_mem &&\
./install -p manubulon &&\
./install -a multisite &&\
./install -a pnp4nagios &&\
./install -a nagvis &&\
./install -p check_netint

Lo de manubulon son checks para snmp

Multisite es una interfaz grafica de la gente de check_mk http://mathias-kettner.de/checkmk_multisite.html . Lo instala en /usr/local/check_mk/. Usa apache, mete el fichero de configuración directamente en /etc/httpd/conf.d/zzz_check_mk.conf
Para acceder http://localhost/check_mk  Acceso: admin/admin

Al instalar nagvis nos pregunta si queremos que apunte a multisite (si no, se quedara con ??)
El check_netint no viene en la doc, pero lo instalo porque es uno de los checks que vienen configurados de ejemplo contra el localhost.


Tras esto la interfaz original (la del puerto 7767) nos mostrará unos cuantos checks, todos estaran en estado UNKNOWN (time out) excepto el de host, que estara OK.


