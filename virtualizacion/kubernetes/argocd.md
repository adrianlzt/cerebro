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

# Usuarios
https://rtfm.co.ua/en/argocd-users-access-and-rbac/
Se hace editando el CM argocd-cm



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



# Actualizar imágenes automáticamente
https://argocd-image-updater.readthedocs.io/en/stable/

## Testing
https://argocd-image-updater.readthedocs.io/en/stable/install/testing/
Podemos entrar dentro del pod que levanta y usar la cli argocd-image-updater para hacer pruebas antes de tagear el deployment.

## Configuración
Ejemplo de una application de ArgoCD donde hemos configurado las annotations para actualizar dos imágenes distintas de un mismo helm usando en ambas las tags que matcheen una regex:
```
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: dev
  namespace: argocd
  annotations:
    argocd-image-updater.argoproj.io/image-list: api=registry:5000/api, app=registry:5000/app
    argocd-image-updater.argoproj.io/write-back-method: git

    argocd-image-updater.argoproj.io/api.allow-tags: regexp:^[0-9]*$
    argocd-image-updater.argoproj.io/api.pull-secret: pullsecret:dockerconfigjson
    argocd-image-updater.argoproj.io/api.helm.image-name: not.used
    argocd-image-updater.argoproj.io/api.helm.image-tag: global.apiVersion

    argocd-image-updater.argoproj.io/app.allow-tags: regexp:^[0-9]*$
    argocd-image-updater.argoproj.io/app.pull-secret: pullsecret:dockerconfigjson
    argocd-image-updater.argoproj.io/app.helm.image-name: not.used
    argocd-image-updater.argoproj.io/app.helm.image-tag: global.appVersion
```

El image-updater mirará cada 2' haber si hay imágenes nuevas.
Si las hay, pusheará un nuevo commit al repo modificando/creando el fichero ".argocd-source-NOMBREAPP.yaml"

En este ejemplo el contenido es (en ese caso no queremos que se setee el nombre de imagen):
```
helm:
  parameters:
  - name: not.used
    value: registry:5000/usync/usync-app
    forcestring: true
  - name: global.apiVersion
    value: "792"
    forcestring: true
  - name: global.appVersion
    value: "1853"
    forcestring: true```

Este contenido lo leerá automáticamente la app argocd y por lo tanto seteará esos parámetros del helm para que se desplieguen esas imágenes.
