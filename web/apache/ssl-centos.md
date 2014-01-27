# http://httpd.apache.org/docs/2.2/ssl/ssl_howto.html#realssl
# http://wiki.centos.org/HowTos/Https

yum install mod_ssl
/etc/httpd/conf.d/ssl.conf

Con la instalación por defecto ya tenemos el 443 configurado para utilizar con todas las cosas que tengamos en el conf.d

Si son virtualhost hace falta cambiarlos?
