https://es.wikipedia.org/wiki/Grafo
http://opendatastructures.org/ods-python/12_Graphs.html

Muy importante conocer como usar grafos.

Conocer las tres formas de representar un grafo en memoria, sus ventajas y desventajas:
 objetos y punteros
 matrices
 adjency list

Conocer los algoritmos para atravesar un grafo (conocer la complejidad computacional, sus pros/cons y como implementarlo en código):
 breadth-first: bfs.md
 depth-first: dfs.md

Mirar algoritmos como Dijkstra y A*


# Representación mediante matrices
Un grafo de n nodos lo representaremos con una matriz nxn donde cada valor es un booleano.
Los boleanos indicarán si existe conexión entre los nodos


# Representación con adjency lists
Una opción sería un primer array con todos los nodos.
Luego siguientes arrays donde se dice con que otros nodos están relacionados.
Ejemplo (usando 0 como que no hay unión):
inic=[1,2,3,4,5]
con1=[2,3,4,5,1]
con2=[3,5,0,0,0]

Podríamos usar también una hashtable con arrays:
{"1": {2,3}, ...}
