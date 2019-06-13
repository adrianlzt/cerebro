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
  Necesitamos 5 volumenes para poder desplegar jx (en las secciones persistent en https://github.com/jenkins-x/jenkins-x-platform/blob/master/values.yaml)
    - jenkins, 30GB, RWO
    - chartmuseum, 8GB, RWO
    - docker-registry, 100GB, RWO
    - mongodb, 8GB, RWO
    - nexus, 8GB, RWO
RBAC (auth)
A cluster with at least 4 vCpus in addition to the master node (e.g. 2 m4.large nodes + m4.large master)

Podemos comprobar si cumple ejecutando (ejecuta https://scanner.heptio.com/):
jx compliance


## Install
Sobre un cluster de kubernetes ya existente
jx install --helm3

--no-default-environments
  si queremos configurar luego el servidor git

Long Term Storage
  no vale para kubernetes on premises (jun'19)

jx install --provider kubernetes
  especificando directamente que estamos desplegando sobre kubernetes (podría ser awx, azure, openshift, etc)

jx install --provider kubernetes -on-premise
  si estamos instalando fuera de una cloud

jx install --provider kubernetes --on-premise --git-api-token='TOKEN' --git-username='usuario'
  metiendo las credenciales de acceso a github
  aún así nos preguntará:
    No existing ingress controller found in the kube-system namespace, shall we install one?
    Domain
    A local Jenkins X cloud environments repository already exists, recreate with latest?  (supongo que sale porque ya tengo .jx con cosas)
    Select Jenkins installation type

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

  Instala un jenkins estatico o serverless (mirar más abajo para ver que es lo de serverless)

  Nos pide credenciales de Github

  En ~/.jx almacena las credenciales de git y credenciales de los servicios que despliega

  Despliega el helm de jenkins-x sobre el namesapce jx:
    cd ~/.jx/cloud-environments/env-kubernetes
    Hace uso tambien de los .yml de ~/.jx/

  Servicios desplegados en el namespace jx:
    - expose
    - jenkins
    - chartmuseum (repo para helm)
    - controllers:
      - commit
      - team
      - workflow
    - docker registry
    - gcactivities
    - gcpreviews
    - heapster
    - mongodb
    - monocular
    - nexus


Crea un CRD en kubernetes (Environments) donde meterá la información de cada entorno, info de git, si se hace promotion automáticamente, etc
https://github.com/jenkins-x/jx/blob/54b13a4fa01092e799ea65e11bee55632754ec34/pkg/kube/crds.go#L26:6
kc get env --all-namespaces



# Git
Por defecto se configura JX para usar Gitlab.
Si queremos usar otro provider (github enterprise, bitbucket, gitlab) mirar en https://jenkins-x.io/developing/git/





# Jenkins serverless
https://medium.com/@jdrawlings/serverless-jenkins-with-jenkins-x-9134cbfe6870

(Idea de como funciona, no revisado)
En vez de tener un Jenkins corriendo esperando nuevos builds, hacemos uso de prow y Knative para solo lanzar Jenkins en el momento que haga falta.
La idea es que prow recibe hooks del server de Git y crea CRDs del tipo ProwJob.
Estas ProwJob genera un CRD Knative, que coge una imagen (elegida en el BuildTemplate) y hace un build del código que venga en la ProwJob
Creo que como parte de esta KBuild se procesa el fichero Jenkinsfile

Parece que por ahora solo soporta Github

No tenemos UI.
Prow tiene una que se llama Deck
Cloudbees tal vez saque una version freemium

Los logs de los builds se almacenan en el pod que ha hecho la ejecucción. Como gestione Kubernetes esos logs será la forma que tengamos de acceder a ellos
La cli da acceso con:
jx logs -k
  mientras corre el build
jx get build log
  disponible unas horas
