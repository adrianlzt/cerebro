# UnsupervisedSampler
[doc](https://stellargraph.readthedocs.io/en/latest/_modules/stellargraph/data/unsupervised_sampler.html)
```

Ejemplo:
```
unsupervised_samples = UnsupervisedSampler(G, nodes=event_nodes, length=2, number_of_walks=2)
walks = unsupervised_sampler.run(2)
```

Dado un grafo G, partiendo de los nodos ``event_nodes``, se realizan para cada uno de esos nodos 1 caminata (walk) de longitud 2 (desde el nodo origen, un salto a un nodo conectado).

Si la longitud es mayor de 2, la caminata tendrá una longitud entre 2 y ese valor.
Es decir, lo que se define es el tamaño máximo de la caminata.

run() nos devuelve las parejas de nodos desde donde se empezó y terminó la caminata.
También se devuelve un array diciendo si ese edge es positivo (se llegó de un nodo a otro con la caminata) o negativo (0), es un edge "negativo" (inventado).

Si tenemos 24 nodos de partida, usamos length 2 y number_of_walks=1, tendremos 48 edges, 24 negativos y 24 positivos.

Si aumentamos en 1 el length, tendremos 96 (48 positivos y 48 negativos).
De la misma manera, si aumentamos el number_of_walks en 1 (con length=2), también tendremos 96.


Notas:

Un camino con length=3 puede tener el nodo origen y destino iguales.

Un nodo negativo puede ser que sea una conexión válida, solo que se ha generado random y ha coincidico que si es un camino válido.
