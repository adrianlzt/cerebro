The Name Service Switch (NSS) provides a central configuration for services to look up a number of configuration and name resolution services. NSS provides one method of mapping system identities and services with configuration sources.

Es donde se dice para cada tipo de elemento donde debe consultarse.
Por ejemplo, para consultar un hostname, primero se pregunta a /etc/hosts y luego a las dns

hosts:      files dns
# consulta primero a /etc/hosts y luego a dns

Consultar un host:
getent hosts www.google.es


Existen varios tipos: passwd, shadow, groups, services, etc
