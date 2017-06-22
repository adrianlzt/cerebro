https://coreos.com/rkt/docs/latest/using-rkt-with-systemd.html

En vez de funcionar como docker, un daemon principal con varios containers como subprocesos, rkt no usa ningún demonio.
Simplemente se ejecuta rkt con lo que queremos ejecutar.
Estos procesos son procesos de unix.
El control lo podemos llevar desde systemd.

# Conceptos
ACI: el formato de imagen

Pods: unidad básica, pueden ser varios containers compartiendo el mismo namespace de red (concepto de kubernetes)


# Instalacion
arch: pacman -Ss rkt

Parece que debe ejecutarse como root, al menos run: https://github.com/rkt/rkt/issues/1585


# Imagenes
Los nombres de las imagenes deben ser dominio/nombre:version

Para encontrar la imagen rkt preguntará a https://dominio/nombre?ac-discovery=1
Funcionamiento del discovery: https://github.com/appc/spec/blob/master/spec/discovery.md
En la web buscará tags html <meta> tipo:
<meta name="ac-discovery" content="example.com https://storage.example.com/{os}/{arch}/{name}-{version}.{ext}">
Mirar por ejemplo: https://coreos.com/etcd?ac-discovery=1

## Bajar
sudo rkt fetch coreos.com/etcd:v2.0.0
Se baja
https://github.com/coreos/etcd/releases/download/v2.0.0/etcd-v2.0.0-linux-amd64.aci (fichero .tar.gz)
lo descomprime y lo guarda en /var/lib/rkt/cas/blob/sha512/fa/sha512-fa1cb92dc276b0f9bedf87981e61ecde93cc16432d2441f23aa006a42bb873df
En /var/lib/rkt/cas/tree/xxxx/ tendremos la imagen descomprimida
El tar tendrá un fichero manifest (json) y un dir rootfs

Podemos apuntar a una imagen directamente:
rkt fetch https://github.com/coreos/etcd/releases/download/v2.0.0/etcd-v2.0.0-linux-amd64.aci

### Imagen docker
rkt --insecure-options=image fetch docker://busybox

## Listar
sudo rkt image list



# Proxy
HTTP_PROXY=1.1.1.1 HTTPS_PROXY=2.2.2.2 rkt ...

Usando un proxy con certificado inseguro (parece que no funciona el download https://github.com/rkt/rkt/issues/2590)
sudo HTTP_PROXY=127.0.0.1:8080 HTTPS_PROXY=127.0.0.1:8080 rkt --debug --insecure-options=all image fetch coreos.com/etcd



# Run
sudo rkt run https://github.com/coreos/etcd/releases/download/v2.0.0/etcd-v2.0.0-linux-amd64.aci
me falla
Failed to mount cgroup2 on /var/lib/rkt/pods/run/c952aa69-dd8a-4bf5-bbcb-990fe1e9f748/stage1/rootfs/sys/fs/cgroup/unified (MS_NOSUID|MS_NODEV|MS_NOEXEC ""): No such file or directory

Un problema montando el cgroup v2.
Pero si hago:
sudo /usr/bin/systemd-nspawn --boot --register=true --notify-ready=yes --link-journal=try-guest --uuid=27464a5c-6f4a-4e05-8192-093a38b57b2b --machine=rkt-27464a5c-6f4a-4e05-8192-093a38b57b2b --directory=/var/lib/rkt/pods/run/c952aa69-dd8a-4bf5-bbcb-990fe1e9f748/stage1/rootfs --capability=CAP_AUDIT_WRITE,CAP_CHOWN,CAP_DAC_OVERRIDE,CAP_FSETID,CAP_FOWNER,CAP_KILL,CAP_MKNOD,CAP_NET_RAW,CAP_NET_BIND_SERVICE,CAP_SETUID,CAP_SETGID,CAP_SETPCAP,CAP_SETFCAP,CAP_SYS_CHROOT -- --default-standard-output=tty
poniendo en --directory el apropiado, me funciona.
