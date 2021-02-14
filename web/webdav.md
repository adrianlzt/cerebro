Protocolo de transferencia de ficheros sobre HTTP.

# Clientes
## thunar (navegador de ficheros)
Ctrl+l and enter the address with dav or davs protocol specified:
dav://webdav.yandex.ru
davs://webdav.yandex.ru
  para TLS

## cadaver (cli)
cadaver https://files.com/
Abre una cli parecida a ftp: cd, download, etc

# Servidores
Apache y NginX lo soportan

## sFTPgo
https://github.com/drakkan/sftpgo
https://github.com/drakkan/sftpgo/blob/main/docs/webdav.md

podman run --name some-sftpgo -p 8080:8080 -p 8090:8090 --rm -it -u 0 -e SFTPGO_SFTPDD__BINDINGS__0__PORT=0 -e SFTPGO_WEBDAVD__BINDINGS__0__PORT=8090 "docker.io/drakkan/sftpgo:v2.0.1"
  por defecto corre con uid=1000, tendremos que montarle dirs con esos permisos para que pueda funcionar
  /srv/sftpgo
  /var/lib/sftpgo

Por defecto viene con un fichero con ciertos valores en /etc/sftpgo/sftpgo.json
No son exactamente los mismos que tiene por defecto (si no tienen ningún fichero)

Admin interface:
Acceso con: admin/password

### K8s / helm
https://artifacthub.io/packages/helm/sagikazarmark/sftpgo
