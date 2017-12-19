SELECT mean(usage_steal) FROM cpu WHERE  time > now() - 7d group by time(5m)
Las métricas de cpu están almacenadas cada 10" (telegraf)
Hay varios servidores escribiendo (creo que unas 12 entradas por cada 10")

Avg: 1.91s
Max: 2.78s
Min: 1.01s


Si usamos un RP donde se estén agrupando los datos cada 5' las peticiones se reducen considerablemente.
En vez de 60480 metricas solo tendremos 2016.
Para este RP los tiempos:

Avg: 0.12s
Max: 0.98s
Min: 0.05s
