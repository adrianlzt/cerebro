http://nagios-plugins.org/doc/man/check_procs.html

Chequear cuanto tiempo lleva un proceso encendido:
Avisar si el proceso top lleva menos de 1 minuto corriendo:
./check_procs -m ELAPSED -C top -c 60:
