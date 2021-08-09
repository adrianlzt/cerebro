mirar auth.md

# Who am i
kubectl krew install whoami
kc whoami

kc whoami --token asdAsda
  ver a quien pertenece un token

# Chequear permisos
Instalar plugins:
kubectl krew install who-can
kubectl krew install rbac-lookup


kubectl who-can VERB (TYPE | TYPE/NAME | NONRESOURCEURL) [flags]

Nos muestra que subject y que ClusterRoleBinding
VERBs: create, get, list, wath, update, patch, delete, deletecollection

Ejemplo:
kubectl who-can create persistentvolumes




Permisos de un user
kubectl rbac-lookup USUARIO


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

