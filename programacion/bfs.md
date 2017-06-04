# BFS (Breadth-first search), búsqueda en anchura
https://en.wikipedia.org/wiki/Breadth-first_search
Partiendo del nodo raiz, se analizan los hijos.
Luego para cada hijo se analiza el primer nivel.
Y así consecutivamente.

Es un análisis por niveles. No se analiza el nivel n+1 hasta que se hayan analizado todos los nodos del nivel n.

En un stack (LIFO) vamos apuntando los nodos que vamos descubriendo.
En una lista vamos apuntando los nodos ya vistos.

Complejidad O(n) en tiempo y espacio




# DFS (Depth-First Search), búsqueda en profundidad
https://en.wikipedia.org/wiki/Depth-first_search
http://opendatastructures.org/versions/edition-0.1e/ods-java/12_3_Graph_Traversal.html#SECTION001532000000000000000
Primero llegamos hasta el extremo yendo por las ramas izquierdas, y luego vamos yendo hacia la derecha por los niveles más bajos posibles.

En un una cola (FIFO) vamos apuntando los nodos que vamos descubriendo.
En una lista vamos apuntando los nodos ya vistos.

Complejidad O(n) en tiempo. En espacio puede ser O(max_depth) o en caso de solucion iterativa O(n)


# BFS vs DFS
https://stackoverflow.com/questions/3332947/when-is-it-practical-to-use-dfs-vs-bfs

DFS malo para árboles muy profundos
BFS puede consumir mucha memoria para grafos muy anchos.
Generalmente habrá que experimentar ya que dependerá del caso.

