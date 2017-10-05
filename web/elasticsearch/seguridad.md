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
