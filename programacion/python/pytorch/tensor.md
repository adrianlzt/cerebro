m = torch.tensor([[1,2]])


Concatenar:
m = torch.cat((m,n))

Convertir dos tensores en uno solo, cada uno para una dimension


Unir tensores:
>>> torch.stack([torch.tensor([1,2]), torch.tensor([99,22])])
tensor([[ 1,  2],
        [99, 22]])



Cambiar de orden los elementos de una matriz
>>> torch.tensor([
      [1,100],
      [2,200]
    ])[:, [1, 0]]

tensor([[100,   1],
        [200,   2]])
