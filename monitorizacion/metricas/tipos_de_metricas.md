https://www.datadoghq.com/blog/timeseries-metric-graphs-101/

# Line graphs
Misma métrica reportada por distintos sistemas (pero no muchos!)

Media de la misma métrica de distintos sistemas.

Medidas donde queremos ver alguna desviación  por parte de un sistema

Metricas que compartan unidades, para observar correlaciones.

Metricas que deban estar entre unos ciertos límites, para observar fácilmente que se sale de uno de estos límites.

# Timeshifted
Gráficas timeshifted 1d, 7d, etc
Así podríamos comparar, por ejemplo, el número de peticiones respecto a el mismo día de la semana anterior.


# Percentiles
Mirar percentiles.md


# Heat maps
Cuando tenemos que mostrar una métrica de una gran cantidad de hosts.
En vez de usar líneas que se cruzaran y no se verá nada, hacemos un heat map, que cuantas más máquinas estén en esa porción de valor, más oscuro será el color.
https://d33tyra1llx9zy.cloudfront.net/blog/images/2016-01-graphing-101/pt1/cpu_good.png

En grafana no están disponibles aún: https://github.com/grafana/grafana/pull/797


# Stacked areas
Si tenemos una misma métrica para muchos hosts, si estos hosts tienen algún punto por donde podamos agregarlos en 2-5 grupos, podemos mostrar la media de estos grupos, con un área y de forma stacked.

Por ejemplo, el tiempo de respuesta de muchos servidores webs. Los organizamos por datacenter (por ejemplo si tuviesemos 3 distintos).
Luego hacemos la media del tiempo de respuesta para cada data center, y mostramos areas stacked por cada datacenter.
https://d33tyra1llx9zy.cloudfront.net/blog/images/2016-01-graphing-101/pt1/nginx_good.png

Otro ejemplo típico sería el tiempo de respuesta a un usuario. Mostrando areas de tiempo de respuesta del frontal, del backend, de la bbdd, etc.

Stacked al 100% para métricas que en total suman el 100% de los recursos.
Por ejemplo el consumo de cpu: user + sys + iowait + idle

Si no podemos agregar en pocos grupos no merece la pena. Mejor mostrar la suma global o usar heat maps.


# Barras
Si tenemos gráficas que suelen tener muchas veces valor 0 es mejor usar bar graphs.

Aquí también podríamos hacer uso de heat map para mostrar más información.
Por ejemplo, mostrar stacked los errores de cada grupo de hosts:
https://d33tyra1llx9zy.cloudfront.net/blog/images/2016-01-graphing-101/pt1/failed_jobs2.png


# Histogramas
Por ejemplo para mstrar la latencia de disco.
No es respecto al tiempo.
Eje x: latencia
Eje y: frecuencia con la que pasa

Veríamos barras más altas en los valores más típicos de latencia
