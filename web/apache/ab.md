http://httpd.apache.org/docs/2.2/programs/ab.html

Para hacer pruebas de carga

an -n <num peticiones> -c <concurrencia>

ab -n 10000 -c 100 http://localhost/

Mándame 10000 peticiones, 100 concurrentes.

Se le pueden pasar cookies, POST, PUT, etc

Interesante:
-e csv-file
Write a Comma separated value (CSV) file which contains for each percentage (from 1% to 100%) the time (in milliseconds) it took to serve that percentage of the requests. This is usually more useful than the 'gnuplot' file; as the results are already 'binned'.


Está bien, pero no tienen un api para usarlo


La idea es automatizar esto de alguna manera para poder analizar los resultados automáticamente, y generar un error si se superan ciertos thresholds.
