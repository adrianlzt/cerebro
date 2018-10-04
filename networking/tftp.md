Protocolo FTP simple. Usado en PXE
Usa UDP
Parece que las peticiones las recibe por el puerto UDP/69, pero las respuestas las origina de un puerto distinto.
Podemos especificar el puerto que usará para enviar los datos al cliente con -R start:end

Cliente ubuntu:
apt-get install tftp-hpa

Arch, server y cliente
pacman -S tftp-hpa

Server:
https://linux.die.net/man/8/in.tftpd


Otro cliente:
pacman -S atftp
$ atftp 127.0.0.1
tftp> get pepe


Servidor tftp-hap:
systemctl start tftpd

Servidor docker:
docker run -p 69:69/udp -v "$PWD/:/var/tftpboot" --rm -it pghalliday/tftp
  no se porque pero no expone el puerto en 127.0.0.1
  usar otra de las IPs del docker host

docker run -v "$PWD/:/var/tftpboot" --rm -it --net host pghalliday/tftp --secure /var/tftpboot -L --address 0.0.0.0:6969 -R 10000:10005 -c
  cambiamos el puerto al 6969 (por si estuviese ocupado el 69 y por si no tenemos privilegios para usarlo)
  arrancamos con --net host porque el puerto que usa para enviar es distinto y parece que no funciona con el nateo de docker
  las respuestas del server las enviará a través del rango de puertos especificado con -R
  si queremos que los clientes puedan subir ficheros tenemos que poner -c (si no, solo dejará subir ficheros que ya existan)


# Errores
Si sale sin dar error posiblemente estamos usando un puerto que no podemos (somos root? puertos privilegiados?)
