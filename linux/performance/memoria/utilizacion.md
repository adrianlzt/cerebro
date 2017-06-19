# Utilizacion
free -m

vmstat -w 1
  mirar los campos de swpd y free

sar -r, "%memused"


sudo slabtop -s c
  uso de la memoria slab


Por proceso usar top/htop.
Mirar "RES" (resident main memory), "VIRT" (virtual memory)

pmap -d PID
pmap -x PID
  memoria que esta usando el proceso. Mapeada, privada, shared.

sudo smem -kt
  por cada proceso:
    memoria swap consumida
    memoria exclusiva del proceso
    memoria exclusiva más la compartida dividida entre el número de procesos que la comparten
    memoria exclusiva + shared



# Saturación
Si swapea es posible que esté saturada, aunque también dependerá de nuestra configuración de swapiness
vmstat -w 1
  mirar si/so (swap in / swap out)

sar -B
  mirar "pgscank" + "pgscand" (scanning)
sar -W


Por proceso
dmesg | grep killed
  si ha saltado el OOM es que el sistema se quedó sin memoria (ram + swap)

ps -o min_flt,maj_flt 1
  min_flt: fallos de página menores (sin acceso a disco)
  maj_flt: necesidad de acceso a disco para obtener una página de memoria

Mirar el min_flt rate por proceso nos puede indicar que este proceso está llevando al sistema por encima de sus posibilidades de memoria

Tambien con perf podríamos medirlo.



# Errores
dmesg
