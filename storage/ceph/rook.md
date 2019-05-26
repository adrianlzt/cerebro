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
Aunque no explican como se pueden modificar las venv


kubectl create -f https://raw.githubusercontent.com/rook/rook/release-1.0/cluster/examples/kubernetes/ceph/common.yaml
  namespace/rook-ceph, CRDs, permisos

wget https://raw.githubusercontent.com/rook/rook/release-1.0/cluster/examples/kubernetes/ceph/operator.yaml
Modificar el FLEXVOLUME_DIR_PATH
kubectl create -f operator.yaml

Esperar a que todos los pods esten running:
kubectl -n rook-ceph get po
