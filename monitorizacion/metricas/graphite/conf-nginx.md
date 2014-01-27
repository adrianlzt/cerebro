https://gist.github.com/drawks/1830579
http://wiki.yepn.net/graphite#graphite_and_nginx
https://gist.github.com/jalaziz/3877123
https://gist.github.com/joshbohde/1401354


cp /opt/graphite/conf/graphite.wsgi.example /opt/graphite/conf/graphite.wsgi

Configuración de nginx:
collectd -> graphite-web.nginx (en este directorio)
ln -s /etc/nginx/sites-available/graphite-web /etc/nginx/sites-enabled/graphite-web

Hace falta que el proceso uwsgi se encuentre corriendo
/etc/uwsgi/apps-available/graphite.ini -> graphite.ini.uwsgi (en este directorio)
ln -s /etc/uwsgi/apps-available/graphite.ini /etc/uwsgi/apps-enabled/graphite.ini


cd /opt/graphite/webapp/graphite; python manage.py syncdb
  no creo superuser

chown -R www-data:www-data /opt/graphite/

/etc/init.d/uwsgi restart
/etc/init.d/nginx restart

