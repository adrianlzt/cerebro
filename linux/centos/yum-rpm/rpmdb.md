http://rpm5.org/docs/api/classRpmdb.html#_details
https://www.redhat.com/archives/rpm-list/2006-May/msg00105.html

Parece que este es el fichero que se usa para leer de la bbdd:
http://rpm5.org/docs/api/rpmdb-py_8c-source.html

Base de datos donde rpm almacena los datos.
Normalmente se encuentra en 
/var/lib/rpm

Son ficheros berkeley db.


Exportarla en formato xml
rpm -qa --xml > fichero.xml



Atacando con python:
import rpm
ts = rpm.TransactionSet("/")
ts.dbMatch('provides',"/bin/ls").next()['name']

Nos devuelve:
'coreutils'
