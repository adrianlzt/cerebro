Es donde se dice para cada tipo de elemento donde debe consultarse.
Por ejemplo, para consultar un hostname, primero se pregunta a /etc/hosts y luego a las dns

hosts:      files dns
# consulta primero a /etc/hosts y luego a dns



Consultar un host:
getent hosts www.google.es
