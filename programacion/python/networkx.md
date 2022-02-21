Librería para trabajar con grafos en python.


import networkx as nx
G = nx.Graph()

Un nodo puede ser cualquier cosa hasheable
```
G.add_node(("1623432", "hardk disk / almost full"))
```

Si añadimos edges y los nodos no existen, se añadirán automáticamente
Los edges pueden tener parámetros
```
G.add_edge(("foo", "server", "linux"), ("foo_mysql_3306", "software", "db", "mysql"), relationType='ownership')
```
