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
