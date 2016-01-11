https://httpd.apache.org/docs/2.2/es/sections.html

Se usan para solo aplicar ciertas configuraciónes a una determinada parte.


Para aplicar solo a un cierto directorio (o un directorio con regex):
<Directory>
<DirectoryMatch>

Para aplicar sobre un fichero (o fichero con regex):
<Files>
<FilesMatch>

Para filtrar por URL (o URL con regex)
<Location>
<LocationMatch>

Configuraciones a aplicar dentro de un virtualhost
<VirtualHost>

Configuraciones si estamos usando mod_proxy
<Proxy>
<ProxyMatch>

Solo si se define un parámetro en la command line
<IfDefine>

Solo si está cargando un módulo:
<IfModule>

Solo si estamos con la versión determinade de Apache
<IfVersion>
