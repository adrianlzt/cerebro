# Queries
Parece que un problema es si almacenamos todas las métricas con poca resolución y después pedimos un time range grande la query tarda mucho en rertornar.
Esto debería solucionarse si estuviese el down sampling integrado en InfluxDB.


# Disco / IOPS
0.10.0
With a test on a 4 core system with 16GB of RAM we wrote 100B data points in 5,000 point batches. The sustained write load over the course of the test was >350,000 points per second and IOPS were fairly steady around 750.

This makes it feasible to run TSM and InfluxDB under significant write load on hardware with spinning disks. The write performance at this point is mostly CPU bound. Servers with more CPUs will be able to support higher write throughput.

Que sistema de ficheros es mejor para almacenar los datos?

# Compression
0.10.0
with regularly spaced timestamps at second level precision and float64s, we’ve seen compression reduce each point down to around 2.2 bytes per point.


# Hardware
https://docs.influxdata.com/influxdb/v0.10/guides/hardware_sizing/



# Almacenamiento
720.000 entradas, cada una con 10 values y 3 tags -> 5.48 bytes/punto
Pruebas echas con capacity_influxdb.py

Leido en twitter:
GiLgAmEzH ⠠⠵ ‏@gilgamezh  9 feb. Ver traducción
after upgrade @InfluxDB 0.9 to 0.10: 425M points. 6GB to 1.2GB :)
->
3 bytes/punto



# Consumo de memoria
Comienzo: 10:40 -> 1.3GB
Medio: 11:26 -> 2.8GB
Fin tras OOM: 11:42 -> 3.4GB
Fin teórico: 12:25
Duracion: 2h12

Consumo de memoria con las pruebas:
1.87GB/hora

Necesidad:
2.25*1.87 = 4.2GB

8GB de Ram deberian ser suficientes


# Red: HTTP/UDP
Parece que UDP mejora mucho la performance: https://github.com/influxdata/influxdb/issues/4656#issuecomment-158656672
Today, we are injecting 200 megabit of metrics per second from ~4k telegraf clients with a low and stable CPU usage (using about 6 cores).

mirar udp.md

Lanzando localmente peticiones con el cliente python con el protocolo http obtengo unas 450 peticiones/s
Con UDP unas 20k

Server -> 16GB RAM | 4 VCPU
