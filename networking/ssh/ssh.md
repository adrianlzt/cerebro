http://blogs.perl.org/users/smylers/2011/08/ssh-productivity-tips.html

Para que conecte más rápido:
En el servidor /etc/ssh/sshd_config:
	UseDNS no

En el cliente, meter la ip con una dirección en /etc/hosts


Para que la salida gráfica del otro pc lo veamos en el nuestro
ssh -X user@host



VPN ssh based:
man ssh -> SSH-BASED VIRTUAL PRIVATE NETWORKS

     The following example would connect client network 10.0.50.0/24 with remote network 10.0.99.0/24 using a point-to-point connection from
     10.1.1.1 to 10.1.1.2, provided that the SSH server running on the gateway to the remote network, at 192.168.1.15, allows it.

     On the client:

           # ssh -f -w 0:1 192.168.1.15 true
           # ifconfig tun0 10.1.1.1 10.1.1.2 netmask 255.255.255.252
           # route add 10.0.99.0/24 10.1.1.2

     On the server:

           # ifconfig tun1 10.1.1.2 10.1.1.1 netmask 255.255.255.252
           # route add 10.0.50.0/24 10.1.1.1






Clave pública:
host-admin# ssh-keygen -t rsa "adrianlzt@gmail.com"  (generamos clave si no la tenemos ya)
host-admin# ssh-copy-id user@host
host-admin# ssh-copy-id "user@host-client -p 6842"  (si ssh está en otro puerto)


Comprimir tráfico (para conexiones de baja velocidad)
ssh -C


~/.ssh/config
# Que no pregunte si nos fiamos el fingerprint al conectar a un server nuevo
StrictHostKeyChecking no


# Ir pasando la clave publica a las maquinas que nos conectemos
# Asi podremos conectar desde una maquina donde estemos logueados con ssh a una tercera usando la clave publica local
# Si conectamos a un host malicioso con ForwardAgent nos pueden robar la clave
# Configurar solo en ciertos nodos
# O usar "ssh -A" en los casos que lo necesitemos
ForwardAgent yes


# Evitar probar GSSAPI auth. Conexiones mas rapidas
# Quitar en los sshd si no lo usamos
GSSAPIAuthentication no


# Cambiar la encriptación usada a una más debil pero más rápida.
# Solo usar en conexiones en entornos seguros o a través de VPN
# http://blogs.perl.org/users/smylers/2011/08/ssh-productivity-tips.html#comment-32977
Host dev
  Ciphers arcfour256
  MACs umac-64@openssh.com
