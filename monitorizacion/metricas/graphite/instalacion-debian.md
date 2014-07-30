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


cd /opt/graphite/conf/
cp graphite.wsgi.example graphite.wsgi
cp carbon.conf.example carbon.conf
cp storage-schemas.conf.example storage-schemas.conf
cd /opt/graphite/webapp/graphite
python manage.py syncdb
chown -R www-data:www-data /opt/graphite/storage/

wget https://raw.github.com/tmm1/graphite/master/examples/example-graphite-vhost.conf -O /etc/apache2/sites-available/graphite
vi /etc/apache2/sites-available/graphite
	WSGISocketPrefix run/wsgi ->  WSGISocketPrefix /var/run/wsgi
En Ubuntu:
	WSGISocketPrefix /var/run/apache2/wsgi

a2dissite default
a2ensite graphite
/opt/graphite/bin/carbon-cache.py start
/etc/init.d/apache2 restart

Para que arranque al inicio:
chkconfig apache2 on
Meter "/opt/graphite/bin/carbon-cache.py start" en /etc/rc.local
