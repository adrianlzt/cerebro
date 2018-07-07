https://console.cloud.google.com/cloudshell/editor?pli=1&shellonly=true

Shell con un linux.
El /home se preserva (5GB)
Comandos: docker, git, cosas de google cloud
Python, ruby, node


Acceso ssh:
gcloud alpha cloud-shell ssh

Copiar ficheros:
gcloud alpha cloud-shell scp cloudshell:~/data.txt localhost:~

Montar sistema de ficheros remoto:
$(gcloud alpha cloud-shell get-mount-command ~/my-cloud-shell)


Puertos abiertos de salida
20/tcp   open  ftp-data
21/tcp   open  ftp
22/tcp   open  ssh
80/tcp   open  http
443/tcp  open  https
3306/tcp open  mysql
5432/tcp open  postgresql
6000/tcp open  X11
8080/tcp open  http-proxy
9418/tcp open  git

