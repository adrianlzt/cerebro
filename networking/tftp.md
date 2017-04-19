Protocolo FTP simple. Usado en PXE
Usa UDP

Cliente ubuntu:
apt-get install tftp-hpa

Arch, server y cliente
pacman -S tftp-hpa


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
