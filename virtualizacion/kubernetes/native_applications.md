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



# Operator framework
https://github.com/operator-framework
Ayudas para poder crear un operator para tu app

Con este framework podemos usar Go o Ansible para crear un operator (tambien helm, pero solo para instalación y actualizaciones).

Para ansible, definiremos un playbook que se ejecutará cada vez que se modifique el recurso.
Para go, nos dan todo el boilerplate para engancharnos a las modificaciones y actuar en consecuencia. Es el método más potente, al poder usar la api de kubernetes si no fuese suficiente con lo que nos da este framework.


## Desarrollar un operator
https://github.com/operator-framework/getting-started<Paste>


## Operator Hub
https://operatorhub.io/

"Tienda" de operators
