https://docs.openshift.com/enterprise/3.0/admin_guide/manage_authorization_policy.html

# Identity Provider
Es donde están "bakcupeados" los usuarios.
LDAP, htpasswd

# Usuarios (auth)
serviceaccounts: usuarios locales, token que no expiran
user (deben estar asociado a un identities provider: LDAP, htpasswd). Tiene token que expira.
certs x509: cert firmado por la CA de openshift con el CN con el nombre del user. O=grupos, CN=nombreuser

# Rolebindings
Asociar roles a usuarios/grupos/serviceaccounts


# Roles
Conjunto de reglas que dicen que "verbo" podemos hacer sobre los recursos.

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
