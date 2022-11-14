Necesitamos los binarios
newuidmap newgidmap
  en rhel shadow-utils

También hace falta, en rhel, para la network:
slirp4netns

Crear /etc/subuid y /etc/subgid
Formato de los ficheros: user:init_uid:number
Nos dice para cada usuario que rango de UIDs puede usar
En RHEL7.7 el nuevo shadow-utils/useradd ya mete las lineas en /etc/sub*id
Parece que todos los uids dentro del container se mapean externamente al init_uid + uid_interno
Root dentro del container será el usuario que ejecuta podman desde fuera.
El resto de users, desde fuera, serán init_uid + uid_interno

En centos7:
echo "user.max_user_namespaces=28633" > /etc/sysctl.d/userns.conf
sysctl -p /etc/sysctl.d/userns.conf
echo "testuser:100000:65536" > /etc/subuid
echo "testuser:100000:65536" > /etc/subgid

El valor máximo soportado de uid es 4294967295 (2^32-1, 32 bits), al menos en RHEL: https://access.redhat.com/solutions/25404
Parece que la manera correcta de meter cosas en los /etc/sub*id es (en versiones recientes de usermod):
sudo usermod --add-subuids 10000-75535 $(whoami)

Se suele poner 65536 porque parece que es lo que necesita podman
https://github.com/containers/libpod/issues/2542#issuecomment-469730746

Parece que despues hace falta correr:
https://github.com/containers/libpod/issues/3421#issuecomment-544455837
podman system migrate

Para comprobar que pilla los uids ejecutar este comando y ver que recibimos esa respuesta:
$ podman unshare cat /proc/self/uid_map
         0       1000          1
         1     100000      65536

Si seguimos teniendo problemas:
sudo touch /etc/sub{u,g}id
sudo usermod --add-subuids 10000-75535 $(whoami)
sudo usermod --add-subgids 10000-75535 $(whoami)
rm /run/user/$(id -u)/libpod/pause.pid
