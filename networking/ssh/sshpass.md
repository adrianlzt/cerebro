http://sourceforge.net/projects/sshpass/

sshpass -f password.txt ssh-copy-id user@yourserver

sshpass -p "password" ssh user@host


for i in host host2 host3 maquina3; do
sshpass -f password.txt ssh-copy-id user@$i
done


# Internals
Está escrito en c de una forma no muy "profesional".

Abre una pseudo terminal (posix_openpt), que le devolverá un FD donde poder leer/escribir.
Registra un handler que cuando se modifique el tamaño de la tty (signal SIGWINCH), replicará ese cambio en la tty virtual
