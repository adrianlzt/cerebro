The Name Service Switch (NSS) provides a central configuration for services to look up a number of configuration and name resolution services. NSS provides one method of mapping system identities and services with configuration sources.

Es donde se dice para cada tipo de elemento donde debe consultarse.
Por ejemplo, para consultar un hostname, primero se pregunta a /etc/hosts y luego a las dns

hosts:      files dns
# consulta primero a /etc/hosts y luego a dns

Consultar un host:
getent hosts www.google.es


Existen varios tipos: passwd, shadow, groups, services, etc


Módulo que nos permite ejecutar cualquier comando para responder a "group", "passwd" y "shadow".
https://github.com/xenago/libnss_shim

wget https://github.com/xenago/libnss_shim/releases/download/1.0.4/libnss_shim_1.0.4_amd64.deb
dpkg -i libnss_shim_1.0.4_amd64.deb
/etc/libnss_shim/config.json

Ejemplo que inventa un usuario:
    "passwd": {
      "functions": {
        "get_all_entries": {
          "command": "echo 'vboxadd2:x:11998:1::/var/run/vboxadd:/bin/false'"

Mirar ssh/auth_at_scale.md para un ejemplo de permitir acceder usuarios sin cuenta.
