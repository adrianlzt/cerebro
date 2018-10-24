# Kubespray
https://kubespray.io/
https://kubernetes.io/docs/setup/custom-cloud/kubespray/
KubeSpray is an incubated Kubernetes community project for deploying K8s clusters on premises or in the cloud.

Interfaz web para desplegar sobre AWS o DigitalOcean.

kubespray-cli
https://github.com/kubernetes-incubator/kubespray
Grupo de playbooks/roles de ansible para hacer el despliegue de kubernetes

Comprobar que la conectividad entre las distintas partes es correcta: https://github.com/kubernetes-incubator/kubespray/blob/master/docs/netcheck.md

Desde una de las máquinas donde se ha desplegado el cluster:
kubectl cluster-info

El cluster estará operando en 127.0.0.1:8080 (al otro lado esta el apiserver) y en https://IP:6443
Localhost es insecure, se permite acceso a la API sin auth.
HTTPS necesita auth

Mirar auth.md


## Vagrant
Tienen un Vagrantfile de ejemplo que desplega 3 nodos usando los roles.
Por defecto, ubuntu1804 y flunnel para red. Podemos meter customizaciones creando el fichero de override: vagrant/config.rb

Cada máquina vagrant con una interfaz interna, una externa y la de internal networking

Para que los nodos expongan la api de kubernetes:
mkdir vagrant
echo '$forwarded_ports = {6443 => 6443}' >> vagrant/config.rb


CUIDADO con hacer vagrant reload!
Parece que mete de nuevo el /swapfile, y kubernetes no corre si lo detecta.
Mirar roles/kubernetes/preinstall/tasks/0010-swapoff.yml



Chequear estado, desde algunas de las maquinas, como user vagrant:
kubectl get nodes


Problemas vistos:
 - los pods no tienen DNS
 - no configura ningún storage
 - no podemos acceder al dashboard de kubernetes




# Kops
# Kubeadm
Comparacion con kubespray
https://github.com/kubernetes-incubator/kubespray/blob/master/docs/comparisons.md


# Minikube
tool that makes it easy to run Kubernetes locally
https://github.com/kubernetes/minikube


# kubicorn
https://github.com/kris-nova/kubicorn
App en golang para desplegar un cluster de kubernetes
