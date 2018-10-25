# Kubespray
https://kubespray.io/
https://kubernetes.io/docs/setup/custom-cloud/kubespray/
https://github.com/kubernetes-incubator/kubespray
Grupo de playbooks/roles de ansible para hacer el despliegue de kubernetes

Actualizar o escalar el cluster: https://kubernetes.io/docs/setup/custom-cloud/kubespray/#cluster-operations

# Despliegue
30' en desplegar sobre vagrant (con imágenes base ya bajadas)

Comprobar que la conectividad entre las distintas partes es correcta: https://github.com/kubernetes-incubator/kubespray/blob/master/docs/netcheck.md
https://github.com/Mirantis/k8s-netchecker-server
  activar poniendo la variable 'deploy_netchecker' a true

Desde una de las máquinas donde se ha desplegado el cluster:
kubectl cluster-info

Para acceder remotamente podemos usar el fichero /root/.kube/config de cualquiera de las maquinas

Chequear que todos los pods están running:
kubectl get pod --all-namespaces | grep -v Running

Revisar si da algún fallo en:
kubectl describe nodes


Para acceder al dashboard crearemos una cuenta y meteremos el token al dashboard
mirar dashboard.md
https://github.com/kubernetes/dashboard/wiki/Creating-sample-user
  ejecutar los dos "create" en ficheros distintos


Testear el cluster con sonobuy:
Lo más facil es entrar en https://scanner.heptio.com/ y ejecutar el comando que nos pasan
En la web deberemos ver un "Your tests are running"
Logs del container del pod:
kubectl apply -f https://scanner.heptio.com/cd601f48985c507c5ea6dccd3b9669ff/yaml/
  falla enviando los resultados, parece que es un bug conocido pero no parece que le den solución

O sin usar el endpoint, localmente, bajándonos los resultados.
go get -u -v github.com/heptio/sonobuoy
sonobuoy run
sonobuoy status
  para ver como va
sonobuoy retrieve
  para entender este dump: https://github.com/heptio/sonobuoy/blob/master/docs/snapshot.md
no veo nada tampoco muy interesante navegando por los ficheros



El cluster estará operando en 127.0.0.1:8080 (al otro lado esta el apiserver) y en https://IP:6443
Localhost es insecure, se permite acceso a la API sin auth.
HTTPS necesita auth

Mirar auth.md


Configurar almacenamiento (por defecto no tienen ningún storageclass) -> storage.md




## Vagrant
Tienen un Vagrantfile de ejemplo que desplega 3 nodos usando los roles.
Por defecto, ubuntu1804 y flunnel para red. Podemos meter customizaciones creando el fichero de override: vagrant/config.rb

Con solo 1vCPU por defecto no arranca ni todos los servicios básicos (no cabe un pod de dns).
echo '$vm_cpus = 3' >> vagrant/config.rb

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

Acceso con:
vargant ssh k8s-01
Chequear estado, desde algunas de las maquinas, como user vagrant:
kubectl get nodes

Seguir mirando en la parte general de despliegue como seguir para usar el cluster





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
