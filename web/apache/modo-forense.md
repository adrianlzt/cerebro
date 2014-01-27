# http://httpd.apache.org/docs/2.2/mod/mod_log_forensic.html

En Debian/Ubuntu:
a2enmod log_forensic

En CentOS:
Descomentar la linea para cargar el módulo: log_forensic_module


En la configuración de un site:
ForensicLog filename

(Mirar como definen en path para ErrorLog y hacerlo igual cambiando el nombre del fichero)
