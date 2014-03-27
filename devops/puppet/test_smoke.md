http://docs.puppetlabs.com/guides/tests_smoke.html

En el directorio test/ del módulo creamos una réplica, a nivel de ficheros, de los que tenemos en manifests/

Cada fichero deberá declarar la clase, con include, class, con parámetros o no.
También se deberá declarar clases anteriores en caso de que hiciese falta.

Los test se ejecutaran con 
puppet apply --noop fichero.pp
