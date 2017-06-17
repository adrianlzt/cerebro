cat /proc/cpuinfo
dmidecode -t processor
getconf -a              # TLB
x86info -c              # TLB
cpuid
lscpu
hwloc
lstopo



http://www.brendangregg.com/blog/2017-05-09/cpu-utilization-is-wrong.html
Cuidado con fiarnos del %CPU. Por si solo no tiene mucho significado.
Una métrica interesante es IPC (instrucciones por ciclo).
Como regla rápida:
  IPC < 1.0: la memoria está siendo el cuello de botella
  IPC > 1.0: estamos intentando ejecutar demasiadas instrucciones

También podemos tener la medida al contrario: CPI (Cycles Per Instruction)


mirar pmcs.md
