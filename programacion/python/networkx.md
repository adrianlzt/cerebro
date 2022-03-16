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


Draw
Ejemplo de draw
    nx.draw_networkx(G, pos=nx.spring_layout(G, seed=42), with_labels=True,
                     node_color=color, cmap="Paired",
                     edge_color=edge_color, edge_cmap=plt.cm.Set3_r)


# Visualización
Para una visualización mejor, en vez de usar matplotlib, podemos exportar al formato gexf y abrirlo con gephi.

nx.write_gexf(G,"out.gexf")


# Navegar

## neighbors
Obtener los nodos hijos conectados.

for n in G.neighbors(source):
    print(G.nodes[n])

## predecessors
Obtener los parents:

## edge
Obtener el edge entre dos nodos (tenemos que poner el orden correcto si es una directed graph).
G.get_edge_data('a','b')
G.predecessors(source)

