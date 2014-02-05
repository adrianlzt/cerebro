http://docs.splunk.com/Documentation/Splunk/6.0.1/admin/inputsconf
http://es.splunk.com/view/SP-CAAAGXA
Splunk Education: Getting Data into Linux

Mediante la interfaz web añadimos un directorio local con ficheros de log:
Los ficheros de log a indexar los tenemos con acceso local desde el server de splunk, y están organizados:
/vagrant/log/HOSTNAME/

Add Data -> A file or directory of files -> Consume any file on this Splunk server -> Skip preview -> Index a file once from this Splunk server -> Path
  More settings
    Host -> segment in path. Segment number=3
    Source type -> automatic

Parece que si metemos ficheros comprimidos en .zip los tratará también.


En Settings -> Data - Data Inputs podemos ver estos datos que hemos metido. Y podremos modificar las propiedades que definimos.
En Indexes podremos ver cuantos MB ha consumido esta indexación, cuantos eventos ha procesado, y las fechas del evento más antiguo y el más nuevo. También nos dará el directorio donde se almacenan físicamente los buckets.


Si vamos a la búsqueda, no veremos nada, porque el usuario admin no tiene acceso al index dsnPRO que hemos creado.
Si le damos acceso (Settings -> Access Controls -> Roles -> Admin -> Indexes, y añadimos dsnpro), tampoco veremos nada en principio, porque no es su index por defecto.
Para hacer una búsqueda tendremos que poner: index=dsnPRO cadena de busqueda



Otros tipos de datos que se pueden meter:
Salida del ps




Si generamos inputs desde la web, se guardará en la app /opt/splunk/etc/apps/nombre desde donde hayamos creado el input.
Podemos saber en que "contexto" estamos mirando la url.
http://splunk-lab-tid1.open3s.com:8011/en-US/manager/launcher/quickstart <- app launcher (home)
También podemos verlo en la parte superior izquierda de la pantalla, en "Back to xxx" (home es el launcher)


Agregar scripts como inputs.
Meterlo en SPLUNK_HOME/etc/system/bin



Ejemplos:
[monitor:///var/log]
disabled = false
followTail = 0
[monitor:///opt/log/tradelog]
disabled = false
followTail = 0
sourcetype = trade_entries
host = trading_system
[script:///home/student11/opt/splunk/etc/system/bin/myvmstat.sh]
sourcetype = vmstat
interval = 30

