https://www.openshift.org/
https://github.com/openshift/origin
https://github.com/openshift/origin-web-common/
  interfaz web

Plataforma como servicios.
La idea es que los desarrolladores mantenan su SW en un repo git y automaticamente este es desplegado.
Soporta una serie de lenguajes de programación (y frameworks), o binarios que puedan correr sobre RHEL.
Tambien soporte las bbdd: MySQL, PostreSQL, MongoDB y CouchBase

Por debajo usa Docker y Kubernetes. Programado en Go.
OpenShift Origin is a distribution of Kubernetes optimized for continuous application development and multi-tenant deployment

It's upstream Kubernetes + a PaaS framework built in top of it.
It takes care of role-based access control, has a secured Docker registry (prevents applications from pulling each other's source code), Jenkins integration and can automatically build, push and deploy your applications.

La version gratuita se llama Origin.
OpenShift es la versión comercial de RedHat


Podemos verlo como un jenkins + openstack todo integraddo en un único producto.
Apuntamos webhooks de nuestro repo de git a openshift.
Cuando se produce algún cambio en el repo se genera una nueva imagen.
Esa imagen se detecta por la aplicación que está corriendo, se paran los containers actuales y se despliega la nueva imagen.
