mirar x-pack.md

# Search Guard
https://floragunn.com/
https://github.com/floragunncom/search-guard-docs

Encryption, authentication, authorization, audit logging and multi tenancy.
Se pone delante de ES para ofrecer https y autenticación contra distintos backends.
Se instala como un plugin de ES

Tienen versión Enterprise con más funcionalidades, por ejemplo integración con LDAP / Active Directory



Consultar nuestra auth:
curl -s --cacert admin-ca --cert admin-cert --key admin-key "https://localhost:9200/_searchguard/authinfo"


# Admin
Se realizará con el script sgadmin.sh
<ES installation directory>/plugins/search-guard-5/tools/sgadmin.sh
Parece que este script es para meter la conf en ES
Según entiendo, la idea es modificar los ficheros .yaml de SearchGuard y luego usar sgadmin.sh para subir esa información al índice "searchguard" de donde leerá el plugin.


# Config
La configuración se almacena en el propio ES.
Por defecto se usa un index "searchguard" (http://floragunncom.github.io/search-guard-docs/sgindex.html)

En el indice se almacenan 5 documentos con distintos _types (serán mapeos de los ficheros sg_action_groups.yml  sg_config.yml  sg_internal_users.yml  sg_roles.yml  sg_roles_mapping.yml):

config: configuración de los distintos tipos de backends usados para autenticar a los usuarios
internalusers: listado de usuarios y hashes que pueden acceder sin tener que usar otro backend de auth (el hash que genera su herramienta en Bcrypt)
actiongroups: grupos de acciones que se pueden realizar, por ejemplo, MANAGE puede usar el endpoint monitor/ y el admin/
roles: asociaciones entre actiongroups y a que indices se pueden aplicar, tambien actiongroups sobre todo el cluster (en vez de actiongroups se pueden definir endpoints directamente)
rolesmapping: relación entre roles y usuarios

