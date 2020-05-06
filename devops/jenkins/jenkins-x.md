Jenkins X es una cli para provisionars clusters de Kubernetes con una serie de herramientas para que los developers se pongan a trabajar de manera rápida y sencilla.

Viene con Jenkins, Helm, integraciones con Github, etc

jx es la herramienta que usaremos para desplegar Jenkins X

A partir de Abril/2020 ya deprecan el modo de JX con un jenkins master.
Ahora se hace todo con tekton (webhook: prow)
https://github.com/jenkins-x/jx-docs/blob/c77f6d31a354c0d43676e60f5076e86b1cb505e3/content/en/blog/news/jenkins-x-tekton.md

El problema es que prow solo está soportado para github.com
Nos dice que cambiemos a lighthouse, pero ese monta un jenkins master.




# install cli
yay jx

Si no está actualizado:
curl -L "https://github.com/jenkins-x/jx/releases/download/$(curl --silent "https://github.com/jenkins-x/jx/releases/latest" | sed 's#.*tag/\(.*\)\".*#\1#')/jx-linux-amd64.tar.gz" | tar xzv "jx"
chmod a+x /usr/local/bin
sudo mv jx /usr/local/bin


# Install Jenkins X sobre un cluster de kubernetes ya montado
https://jenkins-x.io/getting-started/install-on-cluster/

On premises:
https://jenkins-x.io/docs/getting-started/setup/boot/clouds/on-premise/


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


## jxl
JX lab, con helm3, lighthouse+tekton
Bajar binario de https://github.com/jenkins-x-labs/jxl/releases

https://jenkins-x.io/docs/labs/boot/
https://jenkins-x.io/docs/labs/boot/getting-started/repository/

jxl boot create --provider kubernetes --domain 10.10.10.31.nip.io

Usando github.com funciona correctamente

Nos creará un repo en la org que le hayamos especificado.

Para desplegar el entorno de dev:
git clone git@github.com:ORGANIZACION/environment-jxlab-dev.git
cd environment-jxlab-dev
jxl boot secrets edit
jxl boot run




## Boot
Es el nueva forma de desplegar jx

Fichero de config: jx-requirements.yml
Variables por defecto:
https://github.com/jenkins-x/jenkins-x-boot-config/blob/master/jx-requirements.yml

Providers soportados: https://github.com/jenkins-x/jenkins-x-boot-config/tree/master/kubeProviders

### On premises
git clone https://github.com/jenkins-x/jenkins-x-boot-config.git
cd jenkins-x-boot-config
La idea es que nos clonaremos ese repo en nuestro git y será la forma que tengamos de configurar/redesplegar/actualizar jx

Han cambiado cosas tras quitar los master? Revisar
Editar jx-requirements.yml (spec https://jenkins-x.io/docs/reference/config/config/#config.jenkins.io/v1.RequirementsConfig):
cluster.clusterName: jxTest
cluster.provider: kubernetes
cluster.git* configurar nuestro git. El gitName no puede tener mayúsculas, tiene que ser compatible con los nombres de k8s
cluster.environmentGitOwner: jx
  la org de git donde se almacenarán los repos
cluster.devEnvApprovers: xxx
  array de los usuarios que irán por defecto al fichero OWNERS (los que podrán aprobar las PRs)
Configurar los environments[].ingress.domain, podemos usar valores tipo 10.10.10.31.nip.io
  meter   ignoreLoadBalancer: true
También ingress.domain (este para que es?)
devEnvApprovers
webhook: lighthouse
  prow solo está soprtado para github.com

Por defecto estará sin TLS

necesita kubectl < 1.17.0 (abril 2020)
https://github.com/kubernetes/kubectl/releases?after=kubernetes-1.17.0
La última que he visto de 1.16:
curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.16.3/bin/linux/amd64/kubectl
Parece que el problema es que no soporta kubernetes 1.17
no matches for kind "Deployment" in version "extensions/v1beta1"

Usar la última 1-16
https://github.com/rancher/k3s/releases
sudo ./k3s-1.16 server

extensions/v1beta1/Deployment se depreco en la 1.16
https://kubernetes.io/blog/2019/07/18/api-deprecations-in-1-16/
Issue abierta desde 10/2019 para soportar k8s 1.16
https://github.com/jenkins-x/jx/issues/5675
Charts que fallan están en:
https://github.com/jenkins-x/jenkins-x-platform/blob/master/jenkins-x-platform/requirements.yaml

chartmuseum 1.1.5 (http://chartmuseum.jenkins-x.io)
  arreglado en la 1.1.7
jenkins 0.10.38 (http://chartmuseum.jenkins-x.io)
  no arreglado, no hay nueva versión
  fallo en jenkins/templates/jenkins-master-deployment.yaml
  está intentando desplegar un jenkins master, pero queremos headless. Que pasa??
docker-registry 1.5.0 (https://kubernetes-charts.storage.googleapis.com)
  la 1.9.2 está arreglado
heapster 0.3.2 (https://kubernetes-charts.storage.googleapis.com)
  en la 1.0.2 está arreglado

Todo esto viene de este requirement
Que se baja este helm: https://github.com/jenkins-x/jenkins-x-platform/tree/master/jenkins-x-platform
Que tiene esos requisitos.



Parece que hace falta helm2 (abril 2020)
https://github.com/helm/helm/releases


Supuestamente podemos poner helm3, pero no está funcionando:
cluster.helmMajorVersion: "3"


Definir?
  cluster.registry?

Storage: https://jenkins-x.io/docs/managing-jx/common-tasks/storage/
Como ficheros (en una rama de un repo?)
O en un s3-like.
Lo usa para logs, texts, coverage



Ver lo que está haciendo con helm:
export JX_NO_DELETE_TMP_DIR=true

Parece que lo que ejecuta es algo tipo:
kubectl apply --recursive -f /tmp/helm-template-workdir-947282688/jenkins-x/output/namespaces/jx -l jenkins.io/chart-release=jenkins-x --namespace jx --wait --validate=false
El directorio temporal es algo tipo: /tmp/jx-helm-apply-616924604/env
Crea un montón de recursos en k8s


Borrar lo que haya hecho:
helm template jenkins-x . --namespace jx | kubectl delete -f -



## Edit
jx edit xxx
Nos permite modificar la config de jx



## Install (deprecated 1/6/2020)
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
