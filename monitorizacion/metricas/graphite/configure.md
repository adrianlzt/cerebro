RedHat/CentOS
/etc/graphite-web
/etc/carbon

Por defecto retención:
[default_1min_for_1day]
pattern = .*
retentions = 60s:1d





python-pip:
cd /opt/graphite/conf/
cp graphite.wsgi.example graphite.wsgi
cp carbon.conf.example carbon.conf
cp storage-schemas.conf.example storage-schemas.conf
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




Mirar
storage.md
conf-apache.md
conf-nginx.md
web.md
