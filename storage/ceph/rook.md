https://rook.io/docs/rook/v1.0/ceph-storage.html

# Requisitos
modprobe rbd
  debe funcionar

Paquete "lvm2" instalado.


Chequear el path donde se deben cargar los plugins de flexvolumes
https://rook.io/docs/rook/v1.0/flexvolume.html

Para kubespray: /var/lib/kubelet/volume-plugins
Lo tendremos que configurar al desplegar el rook-operator
env:
[...]
- name: FLEXVOLUME_DIR_PATH
  value: "/var/lib/kubelet/volume-plugins"


# Desplegar
Se puede usar helm: https://rook.io/docs/rook/v1.0/helm-operator.html
helm3 repo add rook-release https://charts.rook.io/release
helm3 pull rook-release/rook-ceph
tar zxvf rook-ceph-v1.0.1.tgz
cd rook-ceph
vi values.yaml
  descomentar agent.flexVolumeDirPath y definirlo con el valor que toque
  definir algún filtro en "nodeSelector" para desplegar solo ahí rook? Parece que esto solo aplica a donde se despliega el operator
  enableSelinuxRelabeling a false si no estamos usando selinux

kc create namespace rook-ceph
helm3 install rook-ceph .

Esperar a que todos los pods esten running:
kubectl -n rook-ceph get po


## Cluster
Los discos que añadamos al cluster no pueden tener particiones

Cada cluster debe desplegarse sobre su propio namespace
