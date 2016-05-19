select mean(cpu_idle) AS cpu_idle INTO nueva2 FROM cpu WHERE time > now() - 7d GROUP BY time(10m),*

Coge el cpu_idle de los últimos 7d y los agrega de 10m en 10m, en la tabla nueva2
