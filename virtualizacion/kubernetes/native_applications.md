https://operatorhub.io/
Tienda de operators.

Mirar olm.md

https://enterprisersproject.com/article/2019/2/kubernetes-operators-plain-english
https://developers.redhat.com/blog/2018/12/18/kubernetes-operators-in-depth?intcmp=701f2000000tjyaAAA

Es una abstracción por encima de Kubernetes para manejar aplicaciones complejas que requieren conocimiento del estado.
El típico caso son las bases de datos, que requieren un conocimiento específico de como funcionan para poder gestionarlas correctamente.

Un "Operator" se instala en kubernetes, extenediendo las APIs de este para gestionar al aplicación en cuestión.
Por ejemplo, hay un operator para etcd donde un etcd cluster es un first-class object, evitando "magias" para poder desplegar un cluster.


Problemas que soluciona:
  - Gone are the days of deploying an etcd cluster using a complicated collection of stateful sets, crds, services, and init containers to manage bootstrapping and lifecycle management
  - handling updates from one version to another, handling failure recovery, scaling the application up and down depending on some scenarios

Ejemplo, se puede crear un type custom que sea "backup", que podremos llamar desde kubectl para gestionar el backup de nuestra bbdd.

Cada Operator define una serie de CRD (custom resources definitions) para crear esos nuevos elementos complejos.
Por ejemplo, elastic tiene el CRD "elasitcsearch cluster"
Postgres tiene pgcluster, pgbackup, pgupgrade.


# Funcionamiento
Es un pod más, pero subscrito a los cambios de k8s.



## Operator Hub
https://operatorhub.io/
"Tienda" de operators

https://github.com/operator-framework/awesome-operators
Colección de operators



# Operator framework
https://github.com/operator-framework
Ayudas para poder crear un operator para tu app

Con este framework podemos usar Go o Ansible para crear un operator (tambien helm, pero solo para instalación y actualizaciones).

Para ansible, definiremos un playbook que se ejecutará cada vez que se modifique el recurso.
Para go, nos dan todo el boilerplate para engancharnos a las modificaciones y actuar en consecuencia. Es el método más potente, al poder usar la api de kubernetes si no fuese suficiente con lo que nos da este framework.


## Desarrollar un operator
https://cloud.redhat.com/blog/kubernetes-operators-best-practices
Diagramas explicativos interesantes.
https://kubernetes.io/docs/concepts/extend-kubernetes/operator/


### Operator en python
https://github.com/nolar/kopf


### Usando operator-sdk
https://sdk.operatorframework.io/docs/building-operators/golang/quickstart/

pacman -S operator-sdk

Inicializar el proyecto.
Crear la API.
Crear la imagen de docker.
Desplegarla en k8s, localmente o como un deployment.

Parece que es un recubrimiento de kubebuilder


### Usando kubebuilder
Ejemplo de un operator que crea cronjobs
https://book.kubebuilder.io/cronjob-tutorial/cronjob-tutorial.html
https://github.com/paweloczadly/kubernetes-operator-cronjob/


#### Types
api/v1/xx_types.go

xxSpec
Donde definimos los campos que podremos usar para crear un objeto de este tipo.
Es donde declaramos como será el CRD

xxStatus
Será la info que nos devuelva k8s al hacer un "kubectl get xx"


#### Controller
controllers/xx_controller.go

El que se encarga de, para un spec dado (lo que quiere el usuario), modificar lo que haga falta del "mundo" para que matchee ese estado deseado.

Esto se hará en la función "Reconcile" (https://pkg.go.dev/sigs.k8s.io/controller-runtime/pkg/reconcile).
Se nos pasa el nombre de un objeto y tenemos que devolver el resultado (error o falta de error).

En esta función tendremos acceso a "client.Client", para acceder a los objetos de k8s, un logger y un context.

El objeto que debemos reconciliar estará en req.NamespacedName

https://book.kubebuilder.io/cronjob-tutorial/controller-implementation.html#1-load-the-cronjob-by-name

Los "errores" de salida pueden tener distintos significados.

Reintentar la operación:
return ctrl.Result{Requeue: true}, nil


Rellamar al reconciliador en x minutos.
return ctrl.Result{RequeueAfter: 5*time.Minute}, nil
