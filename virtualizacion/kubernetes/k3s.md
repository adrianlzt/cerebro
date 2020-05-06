https://k3s.io/

mirar distros.md


# Install
En arch
aur/k3s

# Run
systemctl start k3s

Por debajo arranca un container con containerd.


# Config
## Server
Podemos editar el unit para pasarle parámetros al server.
Mirar:
k3s server --help


## Clientes
Config para kubectl, tendremos que pasarlo a ~/.kube/config
/etc/rancher/k3s/k3s.yaml


# Volumes
Tenemos un storageclass "local-path" por defecto.
Deberemos crear los PV a mano.


# Uninstall
https://rancher.com/docs/k3s/latest/en/installation/uninstall/
https://github.com/rancher/k3s/issues/84#issuecomment-468464353

https://raw.githubusercontent.com/rancher/k3s/master/install.sh
mirar create_uninstall


Limpiar:
sudo kill -9 `cat /sys/fs/cgroup/systemd/system.slice/k3s.service/cgroup.procs`
sudo umount `cat /proc/self/mounts | awk '{print $2}' | grep '^/run/k3s'`
sudo umount `cat /proc/self/mounts | awk '{print $2}' | grep '^/var/lib/rancher/k3s'`
sudo umount $(cat /proc/self/mounts | awk '{print $2}' | grep '^/run/netns/cni')
  creo que esto puede impactar containers corriendo de otras cosas
sudo umount $(cat /proc/self/mounts | awk '{print $2}' | grep '^/var/lib/kubelet')
sudo rm -rf /var/lib/rancher/k3s
sudo rm -rf /etc/rancher/k3s
