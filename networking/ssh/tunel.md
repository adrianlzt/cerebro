## Tunel directo##
# Nos conectamos al remote-host a través del gateway #

ssh -f -L <local-ip-to-listen>:<local-port-to-listen>:<remote-host>:<remote-port> gateway -N
-f: go to background
-L: create tunnel
-N: not execute command on the remote machine
En caso de ser necesario tambien se puede especificar user@gateway
Si no ponemos <local-ip-to-listen> cogerá 127.0.0.1

Si tenemos el control master configurado (~/.ssh/config -> ControlMaster ...), y necesitamos hacer varios túneles al mismo host:
ssh -f -o ControMaster=no -L ...

Ejemplo para 'publicar' un puerto de una máquina a la que solo tenemos acceso ssh:
ssh -f -L 10025:localhost:25 smtpserver -N

Publicar el puerto 8140 de puppet en todas las interfaces de esta máquina
ssh -f -L 0.0.0.0:8140:localhost:8140 puppet -N

Configuración .ssh/config para hacerlo más facil
Host tunnel
    HostName database.example.com
    IdentityFile ~/.ssh/coolio.example.key
    LocalForward 9906 127.0.0.1:3306
    User coolio

$ ssh -f -N tunnel


## Tunel inverso ##
# Nosotros hacemos de gateway para que external se conecte a remote-host #
Util cuando un pc no tenemos acceso ssh desde el exterior hacia la máquina

En la máquina 192.168.253.16 se levanta el puerto 8080 que conecta con localhost (donde se ejecuta el comando) en el puerto 3000
ssh -f -R 8080:localhost:3000 192.168.253.16 -N

ssh -f -R <local-port-to-listen>:<remote-host>:<remote-port> external -N

Ejemplo, ejecutado en un pc con ip privada tras un firewall, nos va a permitir conectarnos a la red interna desde nuestra casa
ssh -f -R 10080:web-interna.com:80 home -N
En casa: chrome localhost:10080 nos conecta a web-interna.com



## Tunel SOCKS ##
En los casos anteriores tenemos que crear un tunel para cada destino final.
Si por ejemplo queremos acceder a distintos sitios y/o puertos podemos usar un tunel ssh con el protocolo SOCKS
ssh -D 10001 maquinasalto

Ahora deberemos configurar el cliente (una navegador por ejemplo)
