Si un usuario no tiene un índice en el default, pero si en 'Indexes', para hacer una búsqueda sobre este tendremos que poner:
index=indice y lo que queramos buscar

Splunk Education: Splunk Enterprise 6 Basic Search
http://es.splunk.com/view/SP-CAAAGW8


A la derecha de la barra de búsqueda tenemos un desplegable en el que podemos definir el rango de fechas en el que queremos la búsqueda.
Es muy potente, y tiene varios subdesplegables para buscar en la fecha exacta que queramos.

Splunk busca palabras, por lo que si ponemos "fail", pero en el log aparece 'failure', no lo encontraremos.
Para eso usaremos el wildcard, y pondremos "fail*"
"fail" si encontraría la cadena "fail-count" por ejemplo.


Los términos de búsqueda son case insensitive, y por defecto mete AND entre los términos.

Podemos usar AND, OR, NOT (que deberemos poner en mayúsuclas) y () para búsquedas complejas. 

Podemos buscar cadenas entre comillas a lo google, eg.: "palabras juntas"

Una vez hecha una búsqueda, poniéndonos encima de los resultados, se resaltarán palabras o campos en amarillo, y pinchándolos podremos filtrar tambien por esos campos

En la columna date puede aparecer una fecha distinta a la que aparece en el evento. Esto se debe a que Splunk normaliza las fechas.
Con los ficheros de ejemplo que he importado parece que no lo hace muy bien, porque la hora del servidor es CEST (Madrid), la de mi usuario de splunk la misma, pero aún asi el log dice las 8:05 y splunk las 10:05:15.000+02:00. Parece que es porque mi máquina de pruebas esta en UTC

Pinchando a la flechita que se ve a la izquierda de la búsqueda veremos más información acerca de este evento. Pinchando un término que está como amarillo, lo eliminaremos de la búsqueda.

Podemos pinchar en las barras verdes para hacer zoom sobre una fecha. Y seleccionar varias columnas verdes para crear un tiempo determinado de búsqueda.
