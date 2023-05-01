https://robotmoon.com/ssh-tunnels/
guia gráfica de los túneles

Mirar sshuttle para montar una "vpn" con ssh.

Para mantener los tuneles abiertos: autossh

Opciones interesantes:
-o ServerAliveInterval=60 -o ExitOnForwardFailure=yes -o StrictHostKeyChecking=no

Podemos arrancar un tunel una vez conectados usando la secuencia de escape:
~C
ssh> help
Commands:
      -L[bind_address:]port:host:hostport    Request local forward
      -R[bind_address:]port:host:hostport    Request remote forward
      -D[bind_address:]port                  Request dynamic forward
      -KL[bind_address:]port                 Cancel local forward
      -KR[bind_address:]port                 Cancel remote forward
      -KD[bind_address:]port                 Cancel dynamic forward

Si nos saca el caracter "~" en vez de entenderlo como la secuencia de escape, abrir "cat" (sin ningún fichero) y ponerlo ahí.
https://superuser.com/a/1192862

## Tunel directo##
# Nos conectamos al remote-host a través del gateway #

ssh -f -L <local-ip-to-listen>:<local-port-to-listen>:<remote-host>:<remote-port> gateway -NT
-f: go to background
-L: create tunnel
-N: not execute command on the remote machine
-T: disable pseudo-terminal allocation

En caso de ser necesario tambien se puede especificar user@gateway
Si no ponemos <local-ip-to-listen> cogerá 127.0.0.1

Si tenemos el control master configurado (~/.ssh/config -> ControlMaster ...), y necesitamos hacer varios túneles al mismo host:
ssh -f -o ControMaster=no -L ...

Ejemplo para 'publicar' un puerto de una máquina a la que solo tenemos acceso ssh:
ssh -fNT -L 10025:localhost:25 smtpserver

Publicar el puerto 8140 de puppet en todas las interfaces de esta máquina
ssh -fNT -L 0.0.0.0:8140:localhost:8140 puppet

Configuración .ssh/config para hacerlo más facil
Host tunnel
    HostName database.example.com
    IdentityFile ~/.ssh/coolio.example.key
    LocalForward 9906 127.0.0.1:3306
    User coolio

$ ssh -f -N tunnel


## Tunel inverso ##
# Nosotros hacemos de gateway para que external se conecte a remote-host
Util cuando un pc no tenemos acceso ssh desde el exterior hacia la máquina

Ejemplo con systemd: tunel-ssh-inverso.service
http://blog.kylemanna.com/linux/2014/02/20/ssh-reverse-tunnel-on-linux-with-systemd/

-f: go to background
-R: tunel inverso
-N: no ejecutar comandos, solo forward puertos
-T: disable pseudo-terminal allocation


ssh -NT -R 8087:192.168.1.1:80 estrella
  Levantamos el puerto 8080 en estrella.
  Al conectar a ese puerto, estaremos conectando a 192.168.1.1:80, pasando por el pc que ha ejecutado este comando ssh

ssh -f -R <local-addres-to-listen>:<local-port-to-listen>:<remote-host>:<remote-port> external -NT

Ejemplo, ejecutado en un pc con ip privada tras un firewall, nos va a permitir conectarnos a la red interna desde nuestra casa
ssh -f -R 10080:web-interna.com:80 home -NT
En casa: chrome localhost:10080 nos conecta a web-interna.com

ssh -f -R 0.0.0.0:2221:HOST:22 sysadmin@MIDDLE -NT
  en MIDDLE abrimos el puerto 2221 en todas las interfaces, ese puerto conecta con HOST:22. La conexión con HOST:22 se establece desde el PC que ejecuta este comando.
  en MIDDLE hace falta que este la opcion "GatewayPorts=yes"



## Tunel SOCKS ##
En los casos anteriores tenemos que crear un tunel para cada destino final.
Si por ejemplo queremos acceder a distintos sitios y/o puertos podemos usar un tunel ssh con el protocolo SOCKS
ssh -D 10001 maquinasalto

Ahora deberemos configurar el cliente (una navegador por ejemplo)
