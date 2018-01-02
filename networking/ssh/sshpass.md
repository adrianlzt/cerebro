http://sourceforge.net/projects/sshpass/

sshpass -f password.txt ssh-copy-id user@yourserver

sshpass -p "password" ssh user@host


for i in host host2 host3 maquina3; do
sshpass -f password.txt ssh-copy-id user@$i
done


# Internals
Está escrito en c de una forma no muy "profesional".

Abre una pseudo terminal (posix_openpt), que le devolverá un FD donde poder leer/escribir (masterpt).
Registra un handler que cuando se modifique el tamaño de la tty (signal SIGWINCH), replicará ese cambio en la tty virtual

Hace un fork donde:
 children: crea una nueva session (setsid) para separarse de la TTY actual (de la usada por sshpass) y ejecuta el comando que le hayamos pasado
 parent:
   abre un slavept contra la pseudo terminal. Hay un comentario en el código explicando porque se hace esto, pero no me queda muy claro.
   agrega el masterpt a un "set" de FDs (readfd) para luego poder esperar a que aparezca algo que leer.
   espera que el masterpt tenga datos que leer (se escuchan los FDs del set readfd, lo del masterpt+1 es un requisito del pselect)
   una vez lee del masterpt busca la cadena "assword" para saber si nos están pidiendo la pass (con sshpass -V podemos ver cual es esa cadena que busca) y envia la password
