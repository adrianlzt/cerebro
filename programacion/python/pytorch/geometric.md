# Install
https://pytorch-geometric.readthedocs.io/en/latest/notes/installation.html

Para pytorch1.10, linux, conda y cuda 11.3:
conda install pyg -c pyg -c conda-forge


# Uso
Si queremos usar los ejemplos que vienen, asegurarnos que estamos en el tag de la misma versión que tenemos instalada.


## Crear un grafo
Ejemplo creando un grafo con tres nodos.
Cada uno de estos nodos tiene una única características (en este caso, un número entero).
Los edges entre estos nodos se definen usando la posición del nodo.
Es decir, al crear edges si usamos "0" estaremos refiriéndonos al primer nodo puesto en "x".
Cada columna será un edge.
En este caso tenemos los edges:
 0 -> 1
 1 -> 0
 1 -> 2
 2 -> 1


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
