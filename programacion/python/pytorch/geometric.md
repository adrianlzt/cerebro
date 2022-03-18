Ejemplo para hacer link prediction: https://github.com/Orbifold/pyg-link-prediction

# Install
https://pytorch-geometric.readthedocs.io/en/latest/notes/installation.html

Para pytorch1.10, linux, conda y cuda 11.3:
conda install pyg -c pyg -c conda-forge


# Datasets
https://pytorch-geometric.readthedocs.io/en/latest/modules/datasets.html

Cargar un dataset
from torch_geometric.datasets import ICEWS18
dataset = ICEWS18(root='/tmp/ICEWS18')

En ese directorio nos mete los ficheros con los datos del dataset.

Cuantos grafos tiene el dataset:
len(dataset)

Cuantas características tiene cada nodo:
dataset.num_features

Cuantas clases (grupos) existen.
Sería el resultado esperado del grafo.
Si es un grafo que queremos agrupar en comunidades, las clases serían esas comunidades donde vamos a agrupar a cada nodo.
El trabajo que tendríamos que hacer es usar la info de nodos y edges para terminar sacando esa clase por cada nodo.
En el grafo.y tendremos a que clase pertenece cada nodo.

Tambien podemos gener "train_mask", para partir de una información para comenzar. Esa máscara nos dirá para que nodos conocemos su clase.

Para acceder a cada uno de los grafos:
g0 = dataset[0]
g1 = dataset[1]
...


# Uso
Si queremos usar los ejemplos que vienen, asegurarnos que estamos en el tag de la misma versión que tenemos instalada.


## Crear un grafo
Ejemplo creando un grafo con tres nodos.
Cada uno de estos nodos tiene una única características (en este caso, un número entero).
Los edges entre estos nodos se definen usando la posición del nodo.
Es decir, al crear edges si usamos "0" estaremos refiriéndonos al primer nodo puesto en "x".
Cada columna será un edge.
En este caso tenemos los edges (creamos los dos sentidos para hacer un grafo undirected):
 0 -> 1
 1 -> 0
 1 -> 2
 2 -> 1

NOTA: para x usar dtype=torch.float, si no definimos y pilla "long" fallara con "RuntimeError: expected scalar type Long but found Float"
Para los edges podemos usar int8 o long.

x = torch.tensor([[-1], [0], [1]], dtype=torch.float)
edge_index = torch.tensor([[0, 1, 1, 2],
                           [1, 0, 2, 1]], dtype=torch.long)
data = Data(x=x, edge_index=edge_index)

Otra forma de definir los edges, que parece más evidente de declarar (definimos una fila por edge y luego tenemos que transpoerla y llamar a contiguous (esto es para que se ordene en memoria correctamente):
edge_index = torch.tensor([[0, 1],
                           [1, 0],
                           [1, 2],
                           [2, 1]], dtype=torch.long)
data = Data(x=x, edge_index=edge_index.t().contiguous())

Este formato de describir los edges se llama COO (coordinate format).
En contraposición tendríamos la matriz de adjacencia, donde estarían representados todos los nodos respecto a todos los nodos.
El formato COO solo se queda con los nodos que tienen relación, la matriz representa todo (almacena cosas como "nodoA con nodoB no tiene relación" que en el COO no estará presente).


## Acceso a los valores del grafo
https://pytorch-geometric.readthedocs.io/en/latest/modules/data.html#torch_geometric.data.Data

Número de nodos, cuantas características por nodo y sus características:
data.num_nodes
data.num_node_features
data['x']

Número de edges y como están definidos.
data.num_edges
data['edge_index']

Ver los primeros 10 edges:
data.edge_index.t()[0:10]



Para saber si tenemos nodos sin conectar:
data.has_isolated_nodes()

Para saber si tenemos nodos con edges a si mismos:
data.has_self_loops()

Para saber si todos los edges entre A->B tienen también entre B->A (es decir, que todos los edges son sin sentido, porque tienen ambos sentidos).
"Importantly, PyG does not distinguish between directed and undirected graphs, and treats undirected graphs as a special case of directed graphs in which reverse edges exist for every entry in edge_index"
data.is_undirected()



# Data
## Generar un Data manualmente
```
# Generamos un grafo de 5 servidores y un evento por cada servidor.
# Los servidores están conectados todos con todos.
# Los eventos están conectados todos con todos.
data = Data()
# Creamos 10 nodos, 5 tipo server y 5 tipo evento
data.x = torch.tensor([[1,0] for _ in range(0,5)] + [[0,1] for _ in range(0,5)]).float()
data.num_features = data.x.size()[1]

# Conectar los servers todos con todos (undirected, conecto 1->0 y 0->1)
s1 = torch.cat([torch.ones(4, dtype=torch.int)*i for i in range(0,5)])
s2 = torch.cat([torch.tensor([i for i in range(0,5) if i!=j]) for j in range(0,5)])

# Conectar los eventos todos con todos (undirected, conecto 1->0 y 0->1), cambiar a solo conex server->event
e1 = torch.cat([torch.ones(4, dtype=torch.int)*i+5 for i in range(0,5)])
e2 = torch.cat([torch.tensor([i+5 for i in range(0,5) if i!=j]) for j in range(0,5)])

edges = torch.stack([torch.cat((s1,e1)), torch.cat((s2,e2))])
data.edge_index = edges
```


# Utils

## negative_sampling
https://pytorch-geometric.readthedocs.io/en/latest/modules/utils.html?highlight=negative_sampling#torch_geometric.utils.negative_sampling

Nos devuelve edges entre nodos que no tienen ya un edge.
Se usa para entrenar la red diciendo que edges son 1 (existen) y cuales no existen.
Por defecto nos devuelve el mismo número de muestras negativas que de positivas.

Si ponemos un número de muestras negativas muy alto, tendremos todos los posibles edges.
Por ejemplo, aquí generamos todos los posibles edges entre 3 nodos:
negative_sampling(edge_index=torch.tensor([[0],[0]]), num_nodes=3, num_neg_samples=100)


# Grafo heterogéneo
https://pytorch-geometric.readthedocs.io/en/latest/notes/heterogeneous.html

Grafo con distintos tipos de nodos y edges.
Habrá que hacer adaptaciones para poder aplicar GNN.

Obtener los 10 primeros edges para un tipo de edge determinado:
data['author', 'affiliated_with', 'institution']['edge_index'].t()[0:10]

Estos edges tendrán valores numéricos apuntando al, por ejemplo, autor número 100 en la lista de autores.
Es decir, el id de los nodos es individual para cada grupo de nodos.




# networkx
## Convertir desde/hacia
utils.to_networkx()
utils.from_networkx()

## Visualización 
Podemos usar la lib networkx para visualizar los grafos que tengamos en geometric.

from torch_geometric.utils import to_networkx
import networkx as nx
import matplotlib.pyplot as plt


def visualize_graph(G, color):
    plt.figure(figsize=(7,7))
    plt.xticks([])
    plt.yticks([])
    nx.draw_networkx(G, pos=nx.spring_layout(G, seed=42), with_labels=False,
                     node_color=color, cmap="Set2")
    plt.show()


def visualize_embedding(h, color, epoch=None, loss=None):
    plt.figure(figsize=(7,7))
    plt.xticks([])
    plt.yticks([])
    h = h.detach().cpu().numpy()
    plt.scatter(h[:, 0], h[:, 1], s=140, c=color, cmap="Set2")
    if epoch is not None and loss is not None:
        plt.xlabel(f'Epoch: {epoch}, Loss: {loss.item():.4f}', fontsize=16)
    plt.show()

G = to_networkx(data, to_undirected=True)
visualize_graph(G, color=data.y)
