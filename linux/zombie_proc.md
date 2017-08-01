https://en.wikipedia.org/wiki/Zombie_process
http://www-cdf.fnal.gov/offline/UNIX_Concepts/concepts.zombies.txt
https://askubuntu.com/questions/48624/what-are-zombie-processes

Los procesos zombies son childs que han terminado (con la syscall exit) pero sus proceso padre no ha leído el estado de salida (con la syscall wait)

Normalmente la llamada wait se ejecuta por un handler accionado en el padre por la señal SIGCHLD

Zombies that exist for more than a short period of time typically indicate a bug in the parent program

El problema que podría surgir es que nos quedemos sin PIDs al tener muchos zombies.

Procesos zombies:
ps aux | awk '$8~/^Z/'

To remove zombies from a system, the SIGCHLD signal can be sent to the parent manually, using the kill command
kill -s SIGCHLD PID_PADRE

Intentar acabar con todos los procesos zombies enviando la señal CHILD a todos los parent que tengan zombies:
ps axo ppid=,stat= | awk '$2~/^Z/ { print $1 }' | xargs kill -s SIGCHLD
