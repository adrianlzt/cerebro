https://argo-cd.readthedocs.io/en/stable/

Argo CD is a declarative, GitOps continuous delivery tool for Kubernetes.

# Uso
Definimos repos en la UI de ArgoCD

Luego creamos un project, donde seleccionaremos un repositorio y un destination (cluster de k8s y namespace).
Podemos usar las "labels" para seleccionar solo ciertos recursos.
Por ejemplo, podemos tener una label "environment" y decirle a argo que solo despliegue en este proyecto los recursos de la label "environment=dev".


# Desplegar applications como CRDs
Usar un fichero yaml para definir la aplicación que queremos desplegear.
Deberemos crearla en el namespace de argocd.
https://github.com/argoproj/argo-cd/blob/master/docs/operator-manual/application.yaml


# GitOps CI/CD con helm
https://mixi-developers.mixi.co.jp/argocd-with-helm-fee954d1003c

Tener una CI para los helm chart.
Luego tener un repo donde almacenamos 3 cosas:
  - yaml para crear la ArgoCD application (para poder crearla con un kubectl apply)
  - Chart.yaml con una dependencia del chart que queremos desplegar
  - fichero de valores para parametrizar ese chart



# Notificaciones
 https://argocd-notifications.readthedocs.io/en/stable/
 Instalar con helm

 
# Autodeploy de aplicaciones
https://argocd-applicationset.readthedocs.io/en/stable/Generators-Git/
https://github.com/argoproj/applicationset/blob/master/examples/git-generator-directory/git-directories-example.yaml

Con esto podemos tener un repo donde simplemente creando directorios con yaml, kustomize o helm se crearán y desplegarán las aplicaciones solas.
