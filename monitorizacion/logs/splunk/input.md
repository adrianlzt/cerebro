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
