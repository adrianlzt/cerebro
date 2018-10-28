Jenkins X es una cli para provisionars clusters de Kubernetes con una serie de herramientas para que los developers se pongan a trabajar de manera rápida y sencilla.

Viene con Jenkins, Helm, integraciones con Github, etc

jx es la herramienta que usaremos para desplegar Jenkins X

# install cli
Mirar cual es la última release: https://github.com/jenkins-x/jx/releases
curl -L https://github.com/jenkins-x/jx/releases/download/v1.3.474/jx-linux-amd64.tar.gz | tar xzv
sudo mv jx /usr/local/bin


# install Jenkins X sobre un cluster de kubernetes ya montado
https://jenkins-x.io/getting-started/install-on-cluster/

## Requisitos
https://jenkins-x.io/getting-started/install-on-cluster/

Storage para PVC (persistent volume claims)
RBAC (auth)
A cluster with at least 4 vCpus in addition to the master node (e.g. 2 m4.large nodes + m4.large master)

Podemos comprobar si cumple ejecutando (ejecuta https://scanner.heptio.com/):
jx compliance


## Install
Sobre un cluster de kubernetes ya existente
jx install

jx install --provider kubernetes
  especificando directamente que estamos desplegando sobre kubernetes (podría ser awx, azure, openshift, etc)

jx install --provider kubernetes -on-premise
  si estamos instalando fuera de una cloud

## Que hace por debajo
https://jenkins-x.io/getting-started/install-on-cluster-what-happens/

Instala kubectl y helm si no lo tenemos (otras cosas si estamos instalando en una nube, minishift, etc https://github.com/jenkins-x/jx/blob/43fe6e93f665515f2698b5a352ee168a1fd5799d/pkg/jx/cmd/common_install.go#L82
Instala y arranca tiller localmente? (~/.jx/bin) https://github.com/jenkins-x/jx/blob/43fe6e93f665515f2698b5a352ee168a1fd5799d/pkg/jx/cmd/common_install.go#L686

Arranca jx (https://github.com/jenkins-x/jx/blob/a6b594cebec67b538617b19c3bef316c8af891c6/pkg/jx/cmd/init.go#L147)
Esto parece que verifica que tenemos desplegado tiller, bajados los BuildPacks (para empezar proyectos con un lenguaje) y tenemos el Ingress configurado
  Despliega tiller (en el NS kube-system): https://github.com/jenkins-x/jx/blob/a6b594cebec67b538617b19c3bef316c8af891c6/pkg/jx/cmd/init.go#L371

  Si no estamos on-premise:
    Despliega el ingress controller (NS kube-system) https://github.com/jenkins-x/jx/blob/a6b594cebec67b538617b19c3bef316c8af891c6/pkg/jx/cmd/init.go#L553
      Primero comprueba si está, mirando cuantos PODs del deploy "jxing-nginx-ingress-controller" existen: kc get pod -l 'app=nginx-ingress,component=controller,release=jxing'
      Lo instala con helm: stable/nginx-ingress
      Luego se pone a esperar que este disponible

  Si estamos en on-premise:
    Nos preguntará por un dominio que apuntará a la IP que devuelve "kc cluster-info"
    Si no, configurará nip.io a la IP que toque, de manera que creará los dominios tipo: dominio.10.0.0.100.nip.io
    Si tenemos dnsmasq localmente podemos agregar una entrada tipo:
      address=/.domain.tld/10.0.0.100


Crea un CRD en kubernetes (Environments) donde meterá la información de cada entorno, info de git, si se hace promotion automáticamente, etc
https://github.com/jenkins-x/jx/blob/54b13a4fa01092e799ea65e11bee55632754ec34/pkg/kube/crds.go#L26:6
kc get env --all-namespaces



# Git
Por defecto se configura JX para usar Gitlab.
Si queremos usar otro provider (github enterprise, bitbucket, gitlab) mirar en https://jenkins-x.io/developing/git/
