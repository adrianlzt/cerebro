Se pueden instalar con elasticsearch corriendo.

En el directorio de elasticsearch:
O, si hemos instalado el .deb: /usr/share/elasticsearch/bin/plugin

bin/plugin -install karmi/elasticsearch-paramedic
  Esto se bajará el plugin de github de la rama master
  http://localhost:9200/_plugin/paramedic/
  Nos da estadísticas sobre elasticsearch, consumo de cpu, memoria, uso http, indexing, etc.

bin/plugin -install royrusso/elasticsearch-HQ
  http://localhost:9200/_plugin/HQ/
  Más estadísticas sobre el propio funcionamiento de elasticsearch
  También podemos hacer queries sobre los datos, ver los índices, type mappings y REST console.

bin/plugin -install mobz/elasticsearch-head
  http://localhost:9200/_plugin/head/
  Nos da información sobre el estado de salud del cluster. También nos da un pequeño interfaz para realizar queries. Podemos consultar el estado de los nodos, realizar acciones sobre ellos, etc.
