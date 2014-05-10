http://lwn.net/Articles/317814/

Tunables para OOM:
vm.oom_dump_tasks
vm.oom_kill_allocating_task
vm.panic_on_oom


Si las reservas de memoria siempre fuesen lícitas (no se dejase reservar más memoria de la que existe, vm.overcommit_memory = 2, never overcommit) nunca se ejecutaría el
OOM killer (out of memory killer).
Pero lo normal es tener activado el over commit, de manera que se ofrece a las apps más memoria de la que realmente disponemos. Esto se hace porque se ha visto que las ap
ps siempre reservan más memoria de la que realmente usan. El modo por defecto (0) va dando memoria excepto para peticiones excesivas.
Podemos ver la memoria "allocated" por todos los procesos en: cat /proc/meminfo | grep Committed_AS

Podemos dar un valor a cada proceso para que tenga mayor o menor probabilidad de ser matado:
The possible values of oom_adj range from -17 to +15. The higher the score, more likely the associated process is to be killed by OOM-killer. If oom_adj is set to -17, the process is not considered for OOM-killing (/proc/PID/oom_adj)

Al saltar el oom tendremos una traza en dmesg y en la consola.
De las primeras lineas nos dirá quien ha ejecutado el oom killer y de las últimas tendremos que aplicación se ha matado (Killed process), con su score y la memoria que ocupaba.
Nos hará un dump del estado de la memoria antes de matar la aplicación.

Buscando la línea "Node n Normal" tendremos dos valores importantes: free, high y active_file.
En el caso de tener swappiness=0, solo se swapeara en caso de que free + active_file < high
  http://gitorious.ti.com/ti-linux-kernel/ti-linux-kernel/commit/fe35004fbf9eaf67482b074a2e032abb9c89b1dd?format=patch
  https://git.kernel.org/cgit/linux/kernel/git/torvalds/linux.git/commit/?id=8582cb96b0bfd6891766d8c30d759bf21aad3b4d


