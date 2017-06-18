http://www.brendangregg.com/blog/2017-05-09/cpu-utilization-is-wrong.html
Cuidado con fiarnos del %CPU. Por si solo no tiene mucho significado.
Una métrica interesante es IPC (instrucciones por ciclo).
Como regla rápida:
  IPC < 1.0: la memoria está siendo el cuello de botella
  IPC > 1.0: estamos intentando ejecutar demasiadas instrucciones

También podemos tener la medida al contrario: CPI (Cycles Per Instruction)


mirar pmcs.md



# Uso de la CPU, distintas formas de medirlo:

vmstat -w 1
  mirar us+sy+st: user + sys + staled (virtual machines)

sar -u
  sumar las columas menos %idle y %iowait

mpstat -P ALL 1
  info por procesador
  sumar las columas menos %idle y %iowait


# Saturación de la CPU
Miraremos la cola "runnable" y no deberá sobrepasar el número de CPUs en nuestra máquina
cat /proc/cpuinfo | egrep "^processor" | wc -l

vmstat -w 1
  columna "r" nos dice el número de procesos ejecutables (ejecutandose o esperando para ser ejecutados)

sar -q
  columna "runq-sz" 
