Primero crearemos un tunel inverso para que la máquina pueda conectar al ssh de nuestro pc:
ssh -f -R 2222:localhost:22 MAQUINASINSALIDAINET -NT


En MAQUINASINSALIDAINET instalaremos sshuttle:

Y en esa máquina arrancaremos sshuttle:
sshuttle -Hr userdenuestropc@localhost:2222 0/0 -x 10.0.0.0/8 -x 172.16.0.0/12 -x 192.168.0.0/16 -x 127.0.0.0/8

