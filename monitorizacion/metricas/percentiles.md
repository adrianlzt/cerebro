http://www.somethingsimilar.com/2013/01/14/notes-on-distributed-systems-for-young-bloods/

CUIDADO! con agregar los datos, mirar abajo.

Use percentiles, not averages. Percentiles (50th, 99th, 99.9th, 99.99th) are more accurate and informative than averages in the vast majority of distributed systems. Using a mean assumes that the metric under evaluation follows a bell curve but, in practice, this describes very few metrics an engineer cares about. “Average latency” is a commonly reported metric, but I’ve never once seen a distributed system whose latency followed a bell curve. If the metric doesn’t follow a bell curve, the average is meaningless and leads to incorrect decisions and understanding. Avoid the trap by talking in percentiles. Default to percentiles, and you’ll better understand how users really see your system.


En InfluxDB la función nos devuelve el valor que cumple el percentil que estamos pidiendo.
Ejemplo, almacenamos el tiempo de respuesta de una página web.
Si preguntamos por el percentil 90%, nos dará un número, donde el 90% de las peticiones tardan menos que ese tiempo en ser contestadas.


Mirar percentiles.png
En el se muestran con los puntos morados los valores que tenemos almacenados.
Con la línea azul la media de dichos puntos.
Y con las barras stacked, los distintos valores de percentil calculados.
Podemos ver que si hiciesemos caso a la media obtendríamos una visión incorrecta. Podríamos pensar que la mayoría de la gente carga la web en 50ms.
Mirando los percentiles obtenemos una visión más cercana a la realidad. Vemos que el 50% de la gente carga la web en 9ms o menos.
Y que el 75% carga la web en 105ms o menos.


# Agregación de datos
Muchas bases de datos temporales agregan los datos cuanto estos tienen un tiempo. Esto rompe la posibilidad de usar el percentil.

Si para un día teníamos varios valores, al agregarlos (típicamente con la media), estamos perdiendo esos valores y solo quedándonos con la media.
Cuando hagamos el percentil sobre ese valor agregado no estaremos obteniendo lo esperado.
