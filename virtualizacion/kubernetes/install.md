# Kubespray
https://kubespray.io/
https://kubernetes.io/docs/setup/custom-cloud/kubespray/
KubeSpray is an incubated Kubernetes community project for deploying K8s clusters on premises or in the cloud.

Interfaz web para desplegar sobre AWS o DigitalOcean.

kubespray-cli
https://github.com/kubernetes-incubator/kubespray
Grupo de playbooks/roles de ansible para hacer el despliegue de kubernetes

30' en desplegar sobre vagrant (con imágenes base ya bajadas)

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

Si usamos flannel (por defecto), tenemos que configurar bien que interfaz debe usar (https://github.com/kubernetes-incubator/kubespray/issues/1981):
Si no, no tendremos conectividad entre pods de distintos nodos.
mkdir group_vars
echo "flannel_interface: eth1" > group_vars/all


Si queremos que tengan una tercera interfaz publica:
Despues de:
      config.vm.network :private_network, ip: ip
Añadimos
      ip_ext = "10.0.2.#{i+70}"
      config.vm.network "public_network", ip: ip_ext, :bridge => 'enp5s0f0'



CUIDADO con hacer vagrant reload!
Parece que mete de nuevo el /swapfile, y kubernetes no corre si lo detecta.
Mirar roles/kubernetes/preinstall/tasks/0010-swapoff.yml


Chequear estado, desde algunas de las maquinas, como user vagrant:
kubectl get nodes

Para acceder remotamente podemos usar el fichero /root/.kube/config de cualquiera de las maquinas

kubectl cluster-info
  esto nos dirá los endpoints del cluster y donde está el dashboard

Para acceder al dashboard crearemos una cuenta y meteremos el token al dashboard
https://github.com/kubernetes/dashboard/wiki/Creating-sample-user
  ejecutar los dos "create" en ficheros distintos


Testear el cluster con sonobuy
go get -u -v github.com/heptio/sonobuoy
sonobuoy run
sonobuoy status
  para ver como va
sonobuoy retrieve .
  cuando haya terminado, para bajarnos un .tar.gz con los resultados



Problemas vistos:
 - no configura ningún storage




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
