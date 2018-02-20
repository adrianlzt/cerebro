dmesg - print or control the kernel ring buffer

dmesc -c 
  borra los mensajes actuales

dmesg -T
  pone timestamps. No fiables!!
  En un caso vi una diferencia de más de 12h entre el timestamp de dmesg y el de /var/log/messages

http://elinux.org/Printk_Times
Activar la fecha (kernel 2.6)
echo 1 >/sys/module/printk/parameters/time

dmesg -n 1
  solo sacar por dmesg los mensajes de mayor prioridad




# Mensajes de error

rcu_sched detected stalls on CPUs/tasks
https://access.redhat.com/solutions/2138571
Una CPU se ha quedado pillada (la que esté entre corchetes).
Se sacan call stacks y valores de registros de todas las CPUs.
Parece que lo de sacar el call stack no siempre funciona.

EDAC MC0: 1 CE none on DIMM0
EDAC MC0: 1 CE correctable patrol data ECC on DIMM0
errores de memoria
