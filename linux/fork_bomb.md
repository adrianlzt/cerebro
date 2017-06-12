https://es.wikipedia.org/wiki/Bomba_fork

:(){ :|:& };:

Esto conseguirá acabar con el espacio de PIDs devolviendo errores tipo:
bash: fork: retry: Resource temporarily unavailable


Como actuar ante una fork bomb:
https://www.brainware.ro/2015/10/crazy-devops-interview-questions/
No podemos arrancar nuevos procesos, tendremos que hacer todas las acciones solo son shell scripting built-ins

Lista de pids
for p in /proc/[0-9]* ; do echo ${p#/proc/} ; done

Buscar el cmdline culpable 
read t < /proc/1091/cmdline ; echo $t

Parar todos los procesos bomb:
for p in /proc/[0-9]*/cmdline ; do read cmd < $p ; if [[ $cmd = 'bomb_process_name' ]]; then t=${p%/cmdline} ; kill -SIGSTOP ${t#/proc/} ; fi ; done

Matar todos los procesos bomb:
for p in /proc/[0-9]*/cmdline ; do read cmd < $p ; if [[ $cmd = 'bomb_process_name' ]]; then t=${p%/cmdline} ; kill -SIGKILL ${t#/proc/} ; fi ; done

