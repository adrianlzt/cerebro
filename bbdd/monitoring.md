https://www.xaprb.com/slides/how-to-monitor-your-database/#1

Monitorizar lo que importa al usuario, que la database responda bien y rápido (QoS, cuality of service)

Las 4 métricas que debemos mirar (CELT):
 - concurrencia: número de requests simultáneas (calculado como el sumatorio de la latencia dividido entre el tiempo en el que hacemos ese sumatorio. Ej: suma de las latencias del último minuto dividido entre 60")
 - ratio de errores
 - latencia (tiemp que tarda en contestar). Tenemos que observar la distribución de los tiempos, no solo la media.
 - throughput, respuestas por segundo

Cada una de estas métricas podemos calcular su average y sus percentiles por intervalos de tiempo.

Concurrencia, ratio de errores y latencia también se puede aplicar a requests individuales.


CELT nos da la visión de los usuarios.
USE (aplicado a cpu, memoria, network, storage) nos da la visión desde dentro


Para poder monitorizar las CELT tenemos varias opciones:
 - modo debug: toda la info, pero muy costoso
 - estadisticas de la propia database: poco impacto, pero suelen agregar datos
 - capturar el tráfico: casi cero de carga extra, pero es más complicado y no te da métricas internas de la bbdd


Típicos problemas:
 - latencia muy alta
 - uso de recursos muy alto (cpu, memoria, red, etc)
 - "vecinos ruidosos"

Típicos problemas por tecnología:
 - MySQL: the query cache, replication, the buffer pool…
 - PostgreSQL: VACUUM, connection overhead, shared buffers…
 - MongoDB: missing indexes, lock contention…

Típicos causantes:
 - requests no necesarias
 - requests muy frecuentes
 - requests muy lentas (lenta por que hace mucho trabajo o porqué está esperando? Más lenta de lo que debería?)
 - agotamiento de recursos o paradas (stalls)

La herramienta que usemos para monitorizar la bbdd nos debe dejar:
 - agrupar requests relacionadas
 - ordenar por una métrica
 - mirar los top items
