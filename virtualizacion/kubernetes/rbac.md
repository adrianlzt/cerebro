mirar auth.md
mirar clusterrole.md

https://github.com/FairwindsOps/rbac-manager
A Kubernetes operator that simplifies the management of Role Bindings and Service Accounts.



# Who am i
kubectl krew install whoami
kc whoami

kc whoami --token asdAsda
  ver a quien pertenece un token

# Chequear permisos
Instalar plugins:
kubectl krew install who-can
kubectl krew install rbac-lookup
kubectl krew install rbac-tool
  varias herramientas para consultar y generar roles
  https://github.com/alcideio/rbac-tool


kubectl who-can VERB (TYPE | TYPE/NAME | NONRESOURCEURL) [flags]

Muestra rolebinding y clusterrolebindings que pueden hacer eso
VERBs: create, get, list, wath, update, patch, delete, deletecollection

Ejemplo:
kubectl who-can create persistentvolumes




Permisos de un user
kubectl rbac-lookup USUARIO


# Ver que permiso hace falta
Lo más sencillo es enviar una petición con un usuario sin permisos.
En el error nos dirá que hace falta
User "pepe" cannot get resource "persistentvolumes" in API group "" at the cluster scope



# Asignar permisos
Ejemplo, nos da el fallo:
User "pepe" cannot get resource "persistentvolumes" in API group "" at the cluster scope

El usuario "pepe" quiere ver los "persistentvolumes".
Miramos quien puede hacer eso:
kc who-can get persistentvolumes

Miramos el detalle de algun ClusterRoleBinding (en este caso, porque el scope es cluster) que haga lo mismo.
kc -n some-namespace get clusterrolebindings name-crb -o yaml

Miramos que permiso se le está asignando: roleRef.name
Ver que hace ese role
kc get clusterrole system:persistent-volume-provisioner -o yaml


Ejemplo de ClusterRole en ejemplos/ClusterRole.yaml
Ejemplo de ClusterRoleBinding en ejemplos/ClusterRoleBinding.yaml
