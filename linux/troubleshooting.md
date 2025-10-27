<https://www.brendangregg.com/Articles/Netflix_Linux_Perf_Analysis_60s.pdf>
Cuando estamos ante un error raro de linux, cosas que suelen ser útiles mirar:

df -h
ps -e f
uptime
free -m
top
dmesg | tail -40
vmstat 1
mpstat -P ALL 1
pidstat 1
iostat -xz 1
sar -n DEV 1
sar -n TCP,ETCP 1

dmesg

SElinux activado? getenforce

Ver que no hay ningún fichero tocado a mano:
  En RHEL: yum verify
           rpm -V
  En Arch: sudo pacman -Qk > /dev/null

Algún agente de seguridad instalado?
En un caso era un agente (ds_agent, de Trend micro), que tiraba los paquetes por hacer match en una de las reglas que tenía configurada.

Las fechas del sistema están bien?
Tenemos ficheros en el futuro?

Problemas con las DNS?
Si estamos estableciendo muchas conexiones el DNS puede estar afectando, si tenemos que hacer la resolución cada vez.
Tuve el problema intentando hacer pruebas de carga, apuntando a proxies via dns.
El servidor DNS me retenía las peticiones y contestaba de golpe.
Lo que veía era que las peticiones se agrupaban cada 5s, en vez de estar distribuidas en el tiempo (como indicaba el log de la app que lo estaba haciendo).

Esta herarmienta que hice fue la clave para entender la distribución de las llamadas en un periodo:
tcpconn-hist
<https://gist.github.com/adrianlzt/9d3935b02b1bcdb90634413005cf3ef1>
