https://es.wikipedia.org/wiki/%C3%81rbol_(inform%C3%A1tica)

Nodos conectados en forma de arbol.
La raiz conecta con uno o varios nodos hijos.
Cada nodo hijo a su vez puede conectar con uno o varios nodos.
Cada hijo solo puede tener un padre


height/altura: número máximo de niveles
hoja: nodo sin hijos



# Tipos de árboles

## binary tree
Es un arból con solo dos ramas por nodo, como máximo.
NO tiene porque estar ordenado (el BST si está ordenado)

### binary heap
https://en.wikipedia.org/wiki/Binary_heap
Es un binary tree con dos condiciones adicionales:
  el valor de cada nodo es mayor o igual (llamados max-heaps) que sus hijos (o puede definirse a la inversa, menor o igual, llamados min-heaps)
  todos los niveles están completados, excepto tal vez el último, que en este caso estará rellenado de izquierda a derecha

Insertar datos se llama "bubble up" o "up heap".
Borra datos se llama "bubble down" o "down heap".


## BST (binary search tree)
https://en.wikipedia.org/wiki/Binary_search_tree
https://www.cs.rochester.edu/~gildea/csc282/slides/C12-bst.pdf
http://lcm.csa.iisc.ernet.in/dsa/node91.html
cada nodo puede tener como máximo dos hijos (binary trees)

Sus nodos están ordenados. Al llegar a un nodo, compararemos lo que buscamos con el valor del nodo, si es menor, tiraremos por la hoja de la izquerda, si no por la derecha.

Cada nodo tendrá un puntero al padre, otro para la rama izquierda y otro para la derecha.

Sucesor: el valor menor inmediato (el siguiente valor más pequeño)
Predecesor: el valor mayor inmediato (el siguiente valor más grande)

Si queremos borrar un nodo tendremos que buscar su sucesor y reordenar el arbol


## k-ary/n-ary trees
https://en.wikipedia.org/wiki/K-ary_tree
Árboles donde cada nodo tiene como máximo k/n hijos

Un árbol binario es un 2-ary tree

full k-ary tree: cada nivel tiene k o 0 hijos
perfect k-ary tree: todas las ramas de igual profundidad
complete k-ary tree: todos los niveles están completamente llenos excepto el último. El último nivel, si no está lleno, tendrá todos los nodos lo más a la izquierda posible


## trie-trees
https://es.wikipedia.org/wiki/Trie

Un ejemplo de estos árboles es como se almacenan los RPMs en CentOS. Cada directorio se llama "a", "b", "c" y dentro están los rmps que comienzan por esa letra.
De manera más genérica, podría haber una estructura de directorios tipo:
 a/
   aa/
   ab/
 b/
   ba/
 ...

Generalmente, si un nodo solo contiene un hijo lo eliminamos. Ejemplo:
 a/
   aa/
   abc/
   ac/




# Balanced trees
https://en.wikipedia.org/wiki/Self-balancing_binary_search_tree
Árboles que mantienen su altura al mínimo posible. Con cada inserción o borrado, será necesario un número arbitrario de inserciones/borrados extras para ordenar el arbol.

## AVL
https://en.wikipedia.org/wiki/AVL_tree
Las alturas de cada rama difieren como máximo en 1
For lookup-intensive applications, AVL trees are faster than red–black trees because they are more strictly balanced

Algorithm   Average       Worst Case
Space       O(n)          O(n)
Search      O(log n)[1]   O(log n)[1]
Insert      O(log n)[1]   O(log n)[1]
Delete      O(log n)[1]   O(log n)[1]

Balance factor es la diferencia de alturas entre la rama izquierda y la derecha, debe encontrarse entre -1 y 1.
Cuando se hace una inserción se chequea el balance factor, si sobrepasa el límite se harán rotaciones para equilibrarlo.


## red/black
https://en.wikipedia.org/wiki/Red%E2%80%93black_tree
Cada nodo tiene un bit extra (rojo o negro) que se usa para balancear el arbol.

La raiz es negra
Las hojas son negras (no contienen datos y no son relevantes)
Todo nodo rojo debe tener sus hijos negros
Cada camino desde un nodo a todas sus hojas descendientes contiene el mismo número de nodos negros

Estas reglas provocan que el camino más largo sea como máximo el doble del camino más corto, generando un arbol aproximadamente equilibrado.

El camino más corto sería desde la raiz, a un nodo negro, a una hoja (2)
Por el otro camino sería, raiz, nodo rojo, nodo negro, nodo rojo, hoja (4). No podriamos meter más nodos porque entonces incumpliríamos la regla de atravesar el mismo número de nodos negros.

Algorithm   Average       Worst Case
Space       O(n)          O(n)
Search      O(log n)[1]   O(log n)[1]
Insert      O(log n)[1]   O(log n)[1]
Delete      O(log n)[1]   O(log n)[1]


## splay
https://en.wikipedia.org/wiki/Splay_tree
recently accessed elements are quick to access again

El elemento al que accedemos se mueve al nodo raiz del árbol, por lo que su próximo acceso será inmediato.

Algorithm   Average   Worst Case
Space       O(n)      O(n)
Search      O(log n)  amortized O(log n)
Insert      O(log n)  amortized O(log n)
Delete      O(log n)  amortized O(log n)





# traversal algorithms
BFS and DFS, and know the difference between inorder, postorder and preorder.

Inorder: primero visitamos la rama izquierda, luego el nodo donde estamos, luego la rama derecha

Preorder: primero el nodo donde estamos, luego rama izquierda y rama derecha

Postorder: primero rama izquierda, rama derecha y por último el nodo donde estamos

## BFS (Breadth-first search), búsqueda en anchura
https://en.wikipedia.org/wiki/Breadth-first_search
Partiendo del nodo raiz, se analizan los hijos.
Luego para cada hijo se analiza el primer nivel.
Y así consecutivamente.

Es un análisis por niveles. No se analiza el nivel n+1 hasta que se hayan analizado todos los nodos del nivel n.

En un stack (LIFO) vamos apuntando los nodos que vamos descubriendo.
En una lista vamos apuntando los nodos ya vistos.

Complejidad O(n) en tiempo y espacio


## DFS (Depth-First Search), búsqueda en profundidad
https://en.wikipedia.org/wiki/Depth-first_search
http://opendatastructures.org/versions/edition-0.1e/ods-java/12_3_Graph_Traversal.html#SECTION001532000000000000000
Primero llegamos hasta el extremo yendo por las ramas izquierdas, y luego vamos yendo hacia la derecha por los niveles más bajos posibles.

En un una cola (FIFO) vamos apuntando los nodos que vamos descubriendo.
En una lista vamos apuntando los nodos ya vistos.

Complejidad O(n) en tiempo. En espacio puede ser O(max_depth) o en caso de solucion iterativa O(n)


# Heap
https://en.wikipedia.org/wiki/Heap_(data_structure)

Dos tipos, max heap, min heap.
En el max heap, el parent node siempre será mayor que sus hijos.
