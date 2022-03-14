Graph Neural Networks (GNNs) aim to generalize classical deep learning concepts to irregular structured data (in contrast to images or texts) and to enable neural networks to reason about objects and their relations

Podemos usar pytorch-geometric como software para trabajar con GNNs.


# Casos de uso
Encontrar "comunidades" en grafos.
Dado un grafo de relaciones, encontrar nodos que tengan relaciones entre si.

Comparar distintos grafos.
Ejemplo, modelar cada molécula como un grafo y compararlos para encontrar características o clusterizarlos.

Adivinar la características de un nodo.
Dado un grafo, intentar describir la funcionalidad de un nodo.

Adivinar posibles edges entre nodos.
Dado un grafo, poder descubrir que posibles edges podrían crearse en el futuro entre nodos.


# GCN layer
En cada layer cada feature de cada nodo se ve actualizada por las features de sus vecinos según una matriz de pesos.
Esa matriz de pesos es la que se entrena para que adquiera los valores adecuados.

Si tenemos 3 layers, nuestro nodo se podrá ver afectado por un nodo que esté 3 saltos más lejos.
