# RedHat/CentOS
rpm -Uvh "http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm"
setenforce 0
yum install -y python-carbon graphite-web


# Ubuntu (mirar install_easy.md)
http://graphite.readthedocs.org/en/latest/install.html

Ubuntu 13.10
Hay paquetes .deb (Section: universe/utils)
graphite-carbon - backend data caching and persistence daemon for Graphite
graphite-web - Enterprise Scalable Realtime Graphing
python-whisper - database engine for fast, reliable fixed-sized databases


Ubuntu 12.04
apt-get install -y python-pip gcc libpython2.7 python-cairo-dev python-django python-django-tagging python-twisted nginx uwsgi uwsgi-plugin-python

pip install whisper
pip install carbon
pip install graphite-web





http://linuxracker.com/2012/03/31/setting-up-graphite-server-on-debian-squeeze/


Instalar dependencias
apt-get install -y python2.6 python-pip python-cairo python-django python-django-tagging libapache2-mod-wsgi python-twisted python-memcache python-pysqlite2 python-simplejson python-pyparsing python-rrdtool

Creo que con estos es suficiente:
apt-get install -y python-pip gcc libpython2.7 python-cairo-dev python-django python-django-tagging python-twisted nginx uwsgi uwsgi-plugin-python

Un poco de lio en esos paquetes
Para usar apache necesito libapache2-mod-wsgi
Para usar nginx creo que necesito los uwsgi


pip install pytz (creo que este no hace falta)
pip install whisper
pip install carbon
pip install graphite-web

Grahite no funciona con Django-1.6, hace falta cambiar unos ficheros:
https://github.com/graphite-project/graphite-web/commit/fc3f018544c19b90cc63797d18970a4cc27ef2ad#diff-e383725a971fca0685db19bfe7c65b32
find /opt/graphite/webapp/graphite -iname "urls.py" -exec sed -i s/"from django.conf.urls.defaults import \*"/"from django.conf.urls import \*"/ {} \;

Comprobar que está todo lo necesario:
./check-dependencies.py


Mirar configure.md
