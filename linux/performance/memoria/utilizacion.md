# Utilizacion
free -m

ps -eo pmem,comm,pid,maj_flt,min_flt,rss,vsz --sort -rss | numfmt --header --to=iec --field 5-7
  consumo de rss

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

cat /proc/76954/status | grep Vm | sed "s/ kB/K/" | numfmt --from=iec --to=iec --field 2 | column -t
  tenemos el VmPeak que nos dice el conumo máximo de memoria virtual

pidstat -r -p PID 1 | numfmt --header=3 --to=iec --field 6,7
  minflt, mjflt, vsz, rss, %mem pra segundo para el pid


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

ejemplos de errores de memoria:
[1597034.657023] EDAC MC0: 1 CE correctable patrol data ECC on DIMM0 (channel:0 slot:1 page:0x0 offset:0x0 grain:32 syndrome:0x391a5d80 - bank 2, cas 2832, ras 5977
[1597035.659016] EDAC MC0: 1 CE none on DIMM0 (channel:0 slot:0 page:0x0 offset:0x0 grain:32 syndrome:0x554c9e08 - bank 2, cas 2840, ras 4261

## Chequear erores de memoria
http://fibrevillage.com/sysadmin/240-how-to-identify-defective-dimm-from-edac-error-on-linux-2
EDAC (Error Detection and Correction kernel module) suele ser quien reporta los errores en el dmesg

yum install edac-utils
edac-util
  nos devolverá el estado
  por ejemplo, cuantos errores se han corregido por modulo de memoria
