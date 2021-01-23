Para sistemas de escritorio tal vez queramos usar earlyoom, para matar procesos antes de llegar al límite del oom.

http://man7.org/linux/man-pages/man5/proc.5.html
http://lwn.net/Articles/317814/
https://linux-mm.org/OOM_Killer

Tunables para OOM:
vm.oom_dump_tasks, para hacer que haga un dump de todo el sistema en caso de que salga el OOM
vm.oom_kill_allocating_task, para matar un proceso que se considere, o el causante del oom
vm.panic_on_oom

Se encarga de matar procesos si se queda sin memoria. Empieza a matar procesos que considera poco importantes.
Cada proceso tendrá su propio /proc/PID/oom_score calculado heurísticamente (procesos más viejos más prioridad, procesos de root más prioridad, etc). Cuanto mayor número, mayor probabilidad de que sea matado
/proc/PID/oom_score_adj se usa para incrementar (más posibilidad de ser matado) o decrementar el score.
Los valores posibles van de -1000 (deshabilitar el oom killer en este proc) a +1000

/proc/PID/oom_adj está deprecated desde 2.6.36
En este los valores iban desde -17 (prohibido matarlo), hasta +15

oom_adj y oom_score_adj están entrelazados. Modificar uno afecta al otro.

Si las reservas de memoria siempre fuesen lícitas (no se dejase reservar más memoria de la que existe, vm.overcommit_memory = 2, never overcommit) nunca se ejecutaría el OOM killer (out of memory killer).
Pero lo normal es tener activado el over commit, de manera que se ofrece a las apps más memoria de la que realmente disponemos. Esto se hace porque se ha visto que las apps siempre reservan más memoria de la que realmente usan. El modo por defecto (0) va dando memoria excepto para peticiones excesivas.
Podemos ver la memoria "allocated" por todos los procesos en: cat /proc/meminfo | grep Committed_AS


Al saltar el oom tendremos una traza en dmesg y en la consola.
De las primeras lineas nos dirá quien ha ejecutado el oom killer y de las últimas tendremos que aplicación se ha matado (Killed process), con su score y la memoria que ocupaba.
Nos hará un dump del estado de la memoria antes de matar la aplicación.


Buscando la línea "Node n Normal" tendremos dos valores importantes: free, high y active_file.
En el caso de tener swappiness=0, solo se swapeara en caso de que free + active_file < high
  http://gitorious.ti.com/ti-linux-kernel/ti-linux-kernel/commit/fe35004fbf9eaf67482b074a2e032abb9c89b1dd?format=patch
  https://git.kernel.org/cgit/linux/kernel/git/torvalds/linux.git/commit/?id=8582cb96b0bfd6891766d8c30d759bf21aad3b4d


# Modificar el score para ser matado
choom -p 2047422
  consultar

sudo choom -p 2047422 -n 300
  modificar

Obtener los 10 procesos con mayor OOM score:
printf 'PID\t\tOOM Score\tOOM Score Adj\t\tCommand\n'; while read -r pid comm; do [ -f /proc/$pid/oom_score ] && [ $(cat /proc/$pid/oom_score) != 0 ] && printf '%d\t\t%d\t\t%d\t\t\t%s\n' "$pid" "$(cat /proc/$pid/oom_score)" "$(cat /proc/$pid/oom_score_adj)" "$comm"; done < <(ps -e -o pid= -o comm=) | sort -k 2nr | head -11


# Procesos matados por el OOM
dmesg | grep -i 'killed process'


# Llamar al oom killer manualmente
echo f > /proc/sysrq-trigger
echo f | sudo tee /proc/sysrq-trigger

No mata necesariamente algún proceso.
En el dmesg vemos:
[64099.487756] sysrq: Manual OOM execution
[64100.115794] Purging GPU memory, 45341 pages freed, 7587 pages still pinned, 20425 pages left available.
