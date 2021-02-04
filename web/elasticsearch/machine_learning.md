Motor escrito en c++
https://github.com/elastic/ml-cpp

Hace falta licencia enterprise para usarlo.

# Modo sin supervisión
Análisis estadístico, generando una hipótesis y comparado los valores que van llegando respecto al valor real.
Gráficamente veremos una línea que pinta el dato que queremos vigilar.
En sombreado es lo que espera la hipótesis encontrar.
Al comienzo veremos un sombreado más grande, porque aún no ha podido "aprender" lo que tiene que buscar.

# Population analysis
Actividad rara comparado con comportamiento habitual
Usa clustering
Ejemplo, para logs de un webserver, agrupar por clientip y para cada ip analizar la sum(bytes) de cada uno.
Influencers útiles: geo.src response.keyword


# Unusual/rare events (log categorization)
Encontrar mensajes raros en los logs.
También haciendo clustering, clasificando los logs en grupos y luego ver quien se sale.

Ejemplo, logs desestructurados, donde no podemos extraer información.

ML los agrupará en distintos clusters y luego podemos hacer dos operaciones:
  - count: contar elementos en cada clusters y ver como varía.
      https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-metrics-valuecount-aggregation.html
  - rare: categorías que ocurren raras veces
      https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-rare-terms-aggregation.html

Ejemplo: hacerlo sobre el campo "agent" de los logs de un server web.
Se usa un analyzer para tokenizar este texto libre.

Aquí el tamaño del bucket supondrá que se creen más o menos buckets.

Una alarma podría ser, un cluster determinado ha tenido muchas más entradas que las estimadas para ese tiempo.
Por ejemplo, el grupo de navegadores mozilla en linux han accedido mucho más.

# Jobs

Crearemos un job para un index pattern o búsqueda guardada.
Nos pedirá que elijamos que tipo de job queremos:
  - single metric
      elegimos una métrica, y elegimos el field
      elegiremos el detector que queremos
      si elegimos high/low count, solo encontraremos outliers que se salgan por abajo o solo por arriba
  - multimetric
      más avanzado
      nos deja elegir una métrica, particionarla por algún campo y luego añadir "influencers" (cosas que creemos que pueden tener influencia en el resultado)
      más influencers crearn más overhead
      ejemplo: analizando logs de un server web, usamos el count de logs, particionamos por response (200, 404, etc) y ponemos como influencer el "clientip"
  - population
  - categorization
  - advanced

Dependiendo del bucket span nos saldrán más o menos anomalias.
Cuando mayor es el bucket, estaremos haciendo una media sobre esos valores y por tanto suavizándolos.



# Forecast
https://www.elastic.co/guide/en/machine-learning/current/ml-gs-forecasts.html

Hacer previsiones sobre unas métricas.
Por ejemplo, predecir el consumo futuro de memoria/cpu de una app.

En la vista "Single metric viewer" tenemos un botón "Forecast".



# Dudas
No me queda muy claro que es un influencer, como afecta.
