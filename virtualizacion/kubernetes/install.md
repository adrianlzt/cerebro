# kubeadm
Es quien gestiona la instalación del cluster, pero no instalar el container runtime, ni el network plugin.



# https://github.com/weaveworks/wksctl
No lo he probado
GitOps para instalar kubernetes
Parece en desuso desde mayo 2021


# Kubespray
https://kubespray.io/
https://kubernetes.io/docs/setup/custom-cloud/kubespray/
https://github.com/kubernetes-incubator/kubespray
Grupo de playbooks/roles de ansible para hacer el despliegue de kubernetes

https://github.com/kubernetes-sigs/kubespray/blob/8a5eae94ea69ca865935f00198fe9f13941f132b/docs/getting-started.md

Actualizar o escalar el cluster: https://kubernetes.io/docs/setup/custom-cloud/kubespray/#cluster-operations

Los nodos donde estén los ETCD deben estar bastante libres para poder manejar el cluster.
Lo mejor es tener 3 masters con etcd y sin pods de aplicación (unschedulable/cordon). Debemos tener un número impar de nodos etcd
For durability and high availability, run etcd as a multi-node cluster in production and back it up periodically. A five-member cluster is recommended in production.
Keeping stable etcd clusters is critical to the stability of Kubernetes clusters. Therefore, run etcd clusters on dedicated machines or isolated environments for guaranteed resource requirements.
Lo mejor es tener los etcd sobre SSD
https://github.com/etcd-io/etcd/blob/master/Documentation/op-guide/hardware.md#disks


# Despliegue
git clone https://github.com/kubernetes-incubator/kubespray.git
cd kubespray
pipenv install -r requirements.txt
pipenv shell
cp -r inventory/sample inventory/mycluster
declare -a IPS=(10.10.1.3 10.10.1.4 10.10.1.5)
CONFIG_FILE=inventory/mycluster/hosts.yml python3 contrib/inventory_builder/inventory.py ${IPS[@]}
  automáticamente asignará nombre "nodeN"

inventario:
  kube_control_plane -> nodos "master"
  kube_node -> nodos "workers"

tunear, leer todos los params de config y adaptar:
inventory/mycluster/group_vars/all/all.yml
  - explicación variables: https://github.com/kubernetes-sigs/kubespray/blob/v2.10.0/docs/vars.md
  - como hacer el ha (mirar siguientes líneas)
  - configurar DNS, searchdomains
  - meter dashboard_token_ttl: 86400, para que el token caduque cada día y no nos eche del dashboard todo el rato
inventory/mycluster/group_vars/k8s-cluster/k8s-cluster.yml
  - temas de config de kubernetes
  - por defecto network calico: https://github.com/kubernetes-sigs/kubespray/blob/8a5eae94ea69ca865935f00198fe9f13941f132b/docs/calico.md
  - kube_service_addresses y kube_pods_subnet deben ser subnets que no usemos (por defecto 10.233.x)
  - dns (mirar más abajo)

HA, usar un LB local a los nodos no master, o un LB externo (haproxy por ejemplo) que configuraremos fuera de kubespray.
https://github.com/kubernetes-sigs/kubespray/blob/v2.10.0/docs/ha-mode.md
Si usamos un LB externo, deberemos configurarlo antes del deploy. Si no, fallará al intentar arrancar el master, ya que este intentará conectar a la VIP:8383 para acceder a los :6443 de los master.
Config de ejemplo (la de la doc une todo en un "listen", mala práctica, y no mete checks, provocando que en el arranque se envíe tráfico al nodo aún no arrancado)
frontend tcp_fe_kubernetes-apiserver-https
  bind :8383
  option ssl-hello-chk
  mode tcp
  timeout client 3h
  timeout server 3h

  use_backend be_tcp_kubernetes-apiserver-https

  # ya existe en otra parte de la configuración
  default_backend default

backend be_tcp_kubernetes-apiserver-https
  option ssl-hello-chk
  default-server check
  server nodemaster 10.0.1.3:6443
  server nodemaster2 10.0.1.4:6443




DNS: https://github.com/kubernetes-sigs/kubespray/blob/8a5eae94ea69ca865935f00198fe9f13941f132b/docs/dns-stack.md
kubernetes desplegara un server dns authoritative para el dominio "dns_domain", que por defecto es el valor de "cluster_name"
Si ponemos más de un punto en el dns_domain, tendremos que subir el ndots (creo)
El server de k8s no se configurará en el resolv.conf de los servers. Meterlo?
El netcheck levanta containers con --net=host que pillan ese resolv.conf e intentan resolver el dominio de un service (sin poder).
Si tuviesemos esos dns en el host si funcionaría.
Tambien hace falta agregar al search del resolv.conf, porque el pod solo buscará "nombre-service", los siguientes valores:
search pruebas.svc.kube.mi.dominio svc.kube.mi.dominio kube.mi.dominio
Entiendo que netchecker no lo está haciendo correctamente. Pues los hosts no deben tener en el search el dominio de un namespace.
Según la doc, hace falta levantar netchecker en el "default" namespace
Si tenemos dns propios los tendremos que meter en upstream_dns_servers


Comprobar que llegamos a los hosts. Mirar si queremos cambiar los nombres asignados (nodeX) por nuestros hostnames. Tal vez tocar el ansible_host por el nombre que usemos para acceder por ssh:
ansible -i inventory/mycluster/hosts.yml all -m ping

CUIDADO! ansible 2.8 no soportado (Mayo'2019): https://github.com/kubernetes-sigs/kubespray/issues/4778

Desplegar (poner "time"? redirigir output a log?):
ansible-playbook -i inventory/mycluster/hosts.yml --become cluster.yml
  si desplegamos sobre un cluster activo tendremos pequeños cortes de la API y etcd. Me tiró una bbdd percona-xtradb-cluster-operator



30' en desplegar sobre vagrant (con imágenes base ya bajadas)
51' al desplegar sobtre tres VMs en distintos hosts

Comprobar que la conectividad entre las distintas partes es correcta: https://github.com/kubernetes-incubator/kubespray/blob/master/docs/netcheck.md
Desplegar sobre el namespace "default"
Si configuramos una variable, "deploy_netchecker" (por defecto a false), se autodespliega el netchecker de mirantis en nuestro cluster.
Si no la hemos puesto, podemos desplegarlo despues. Mirar:
https://github.com/Mirantis/k8s-netchecker-server
Podemos instalarlo con helm3:
wget https://github.com/Mirantis/k8s-netchecker-server/archive/master.zip
unzip master.zip
cd netche*
cd helm-chart/netchecker-server
helm3 install netchecker .
  seguir las instrucciones para obtener ip:puerto (tal vez tengamos que mirar a mano el service, porque parece que hay algún bug)

Misma operación para instalar los agentes como un daemonset
https://github.com/Mirantis/k8s-netchecker-agent/archive/master.zip
...
helm3 install netchecker-agent .

Chequear analisis:
curl http://10.0.2.135:31081/api/v1/connectivity_check | jq




A mano:
kc create namespace pruebas
nkc pruebas

Conexión pod->internet. k8sNode->IP Service, exterior->NodePort
kubectl run hello-minikube --image=gcr.io/google_containers/echoserver:1.4 --port=8080
  comando deprecated. Como se hace con "create"?
kc exec -it hello-minikube-597c997dd4-5gqf6 curl ifconfig.co<Plug>CocRefresh
  comprobamos si salimos desde los pods a internet
kubectl expose deployment hello-minikube --type=NodePort
kc get service
  desde un nodo de k8s hacemos curl a la CLUSTER-IP puerto 8080. Si contesta es que funcionan bien los services
  desde nuestro PC atacamos a la IP de uno de los nodos de k8s al puerto de PORTS (será 31xxx)
  Si estamos en el namespace pruebas:
  curl $(kubectl get nodes --namespace pruebas -o jsonpath="{.items[0].status.addresses[0].address}"):$(kubectl get --namespace pruebas -o jsonpath="{.spec.ports[0].nodePort}" services hello-minikube)
  Si funciona es que podemos exponer correctamente puertos en los nodos de k8s y el tráfico se enruta hacia el service.

Acceso pod en todos los nodos. Conex entre pods:
Desplegar un daemonset, para tener un pod en cada nodo (mirar daemon_set.md)
Intentar entrar en todos con:
kubectl exec -it echods-XXX sh
  hacer curl entre los pods (podemos ver sus ips con "kc get pod -o wide")
  hacer curl hacia algún service desde todos los pods (el service de minikube que hemos creado antes)
Intentar recuperar logs de todos los pods
  kc logs --tail 1 echods-XXX


Fallos?
  - firewall en algún nodo?



Desde una de las máquinas donde se ha desplegado el cluster:
kubectl cluster-info
  obtendremos la url del dashboard (mirar más abajo para ver como acceder)

Para acceder remotamente podemos usar el fichero /root/.kube/config de cualquiera de las maquinas

Chequear que todos los pods están running:
kubectl get pod --all-namespaces | grep -v Running

Revisar si da algún fallo en:
kubectl describe nodes

Chequear que podemos salir desde los pods a internet y hablar entre pods corriendo en distintos hosts


Para acceder al dashboard crearemos una cuenta y meteremos el token al dashboard
mirar dashboard.md
https://github.com/kubernetes/dashboard/wiki/Creating-sample-user
  ejecutar los dos "create" en ficheros distintos
It is recommended to access dashboard from behind a gateway (like Ingress Controller) that enforces an authentication token. Details and other access options here: https://github.com/kubernetes/dashboard/wiki/Accessing-Dashboard---1.7.X-and-above



Testear el cluster con sonobuy:
Lo más facil es entrar en https://scanner.heptio.com/ y ejecutar el comando que nos pasan
En la web deberemos ver un "Your tests are running"
Logs del container del pod:
kubectl apply -f https://scanner.heptio.com/cd601f48985c507c5ea6dccd3b9669ff/yaml/
  crea un namespace "heptio-sonobuoy" donde levanta los pods
  Parece que el trabajo se hace aqui: kc logs -f sonobuoy-e2e-job-2aa6acd91a024800 e2e
  falla enviando los resultados, parece que es un bug conocido pero no parece que le den solución
  sigue sin funcionar, may'19

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
https://github.com/kubernetes-sigs/kubespray/blob/1d5a9464e238ce5988cb902196338e3b5a517363/roles/kubernetes-apps/external_provisioner/local_volume_provisioner/README.md
notas sobre local volumes
https://github.com/kubernetes-sigs/kubespray/blob/9ffc65f8f3fad69dc55b7c4408d215f6971b2e73/extra_playbooks/build-cephfs-provisioner.yml
cephfs para provisionar volumenes?



## Añadir más nodos
Agregarlos al inventario y al grupo que necesitemos. Es seguro ejecutarlo sobre un cluster funcionando (no se si atraverme a decir, sobre un cluster en producción)
ansible-playbook -i inventory/mycluster/hosts.yml scale.yml
  limitar solo a los nuevos nodos?
  15' tres nuevos nodos



## Quitar un nodo
mirar admin.md



## Errores / troubleshooting

### Nuevos nodos etcd
Al intentar añadir más nodos con etcd y quitando uno, se deconfiguró, dejándome unos certificados incorrectos y etcd sin funcionar.
Parece que es mejor ir añadiendo de dos en dos (para mantener la imparidad).
Y como sacar uno que ya es parte del cluster?

mirar etcd.md



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
        NO me funciona, me pone la misma ip que en eth2 (la private)
        entrar en las máquinas y ejecutar (poniendo la IP que toque):
          nmcli c mod "System eth2" ipv4.addresses "10.0.2.72/24" ipv4.gateway "10.0.2.51"
          nmcli c up "System eth2"



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


