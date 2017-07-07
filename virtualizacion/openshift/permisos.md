https://docs.openshift.com/enterprise/3.0/admin_guide/manage_authorization_policy.html

# Identity Provider
Es donde están "bakcupeados" los usuarios.
LDAP, htpasswd

# Usuarios (auth)
serviceaccounts: usuarios locales, token que no expiran
user (deben estar asociado a un identities provider: LDAP, htpasswd). Tiene token que expira.
certs x509: cert firmado por la CA de openshift con el CN con el nombre del user. O=grupos, CN=nombreuser

# Rolebindings
Asociar roles a usuarios/grupos/serviceaccounts (a nivel de proyecto)
oadm policy who-can <verb> <resource>
oadm policy add-role-to-user <role> <username>
oadm policy remove-role-from-user <role> <username>
oadm policy add-role-to-group <role> <groupname>
oadm policy remove-role-from-group <role> <groupname>

Para dar permisos a una SA
oadm policy add-role-to-user ROLE -z NOMBRESA

# ClusterRolebindings
Asociar roles a usuarios/grupos/serviceaccounts (a nivel de todo el cluster)
oadm policy add-cluster-role-to-user <role> <username>
oadm policy remove-cluster-role-from-user <role> <username>
oadm policy add-cluster-role-to-group <role> <groupname>
oadm policy remove-cluster-role-from-group <role> <groupname>

Rol de admin de todo el cluster: "cluster-admin"

Para dar permisos a una SA
oadm policy add-cluster-role-to-user cluster-admin -z monitoring-deploy



# Roles / clusterrole
Conjunto de reglas que dicen que "verbo" podemos hacer sobre los recursos.
Role: aplica a nivel de proyecto
ClusterRole: aplica a nivel de cluster

resources:
verbs:

get: describir un recurso
list: listar todos los recursos de ese tipo
watch: registrarnos a los cambios


# Asignar permisos
Un admin de proyectos puede crear roles y asignar permisos siempre que él admin tenga estos permisos


# Service accounts
oc create serviceaccount NOMBRE
  se crean tres secrets, uno con el secret, los otros dos ?

oc sa get-token NOMBRE
  obtener el token de una service account

Tiene una o más SCCs (se añaden los permisos de todas)

Todo pod se levanta con un system account determinada, por defecto la sa/default que aparece al crear el proyecto.
