http://docs.icinga.org/latest/en/clusters.html

Para chequear clusters hay varias opciones.

# Activo - Pasivo #
# Si hay virtual ip
La más básica es chequear cosas básicas del sistema mediante la ip del sistema, y los procesos clusterizados via la virtual ip

# Si no hay virtual ip
Podemos usar check_multiaddr, de modo que el mismo check se ejecutará en varias ips distintas.
Deberemos definir un nuevo host con dos ips, y el mismo check se ejecutará contra esas dos ips.
O podemos pasar como parametros las ips que queremos chequear, y asi dejar asociado el check a los dos hosts afectados, por ejemplo.

# Activo - Activo #
check_cluster
