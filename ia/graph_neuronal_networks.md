https://www.youtube.com/c/DeepFindr/videos
https://distill.pub/2021/gnn-intro/
https://arxiv.org/abs/1812.08434
    Graph Neural Networks: A Review of Methods and Applications
https://www.cs.mcgill.ca/~wlh/grl_book/

https://rish16.notion.site/Graph-Neural-Networks-for-Novice-Math-Fanatics-c51b922a595b4efd8647788475461d57
  Graph Neural Networks for Novice Math Fanatics
  No me parece una explicación muy correcta, pero para tomar nociones un poco más avanzadas creo que está bien.
  Al final tiene links a papers interesantes

Para programar GNNs: https://pytorch-geometric.readthedocs.io/en/latest/

Podemos resolver problemas usando el grafo a distintos niveles:
 - grafo completo (compara grafos entre sí)
 - node (predecir rol de un nodo en un grafo)
 - edge (predecir posibles conexiones entre nodos)
 - generar embeddings de los nodos (obtener unos vectores de cada nodo que han "aprendido" de sus vecinos)


Nomenclatura:
  - embedding: el contenido de información del nodo o edge


Al aplicar capas sobre el grafo modificamos los embeddings (la info) que tienen los nodos, edges o el contexto global, pero no modificamos las conectividades.

Parece que vamos aplicando capas GNNs y generando nuevos "embeddings", que modifican los nodos y edges (no sus conexiones), aportando información de los nodos y edges vecinos.
Por ejemplo, tras una layer, cada nodo puede haber aprendido información de sus nodos vecinos y haberlo incorporado a su propio nodo.

Si quieres hacer predicciones de todo el grafo, se combinaran todos los embeddings (toda la info de los nodes y edges) combinada.

La forma que tiene la GNN de pasar información entre los nodos es "message passing".
En cada layer combinamos (aggregation y update functions) la información del nodo con la de, por ejemplo, sus nodos vecinos, para formar una nueva información (embedding como se dice en este área)

Si solo hacemos un message passing (MP), los nodos solo podrían tener info de sus vecinos directos.
Según vamos aplicando más MP esa info puede ir navegando más lejos.

Una vez hemos combinado la información con varios MPs, podemos hacer una predicción.

Cuantas layers poner es un metaparámetro que deberemos configurar según el tamaño del grafo o como de "lejos" queramos saltar para obtener info.
Tal vez solo queremos quedarnos en un área local al nodo, o tal vez necesitemos llegar a los nodos más lejanos.

Si metemos muchos saltos en un grafo pequeño podemos generar "over-smoothing", haciendo que todos los embeddings de los nodos terminen siendo igual.


Posibles opciones para las funciones de aggregation y update.
aggregation:
 - mean
 - max
 - normalized sum
 - neuronal network

update:
 - mean
 - max
 - neuronal network
 - recurrent NN
