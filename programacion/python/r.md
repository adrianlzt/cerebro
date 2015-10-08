http://rpy.sourceforge.net/

pip install rpy2


# Objetos
>>> import rpy2.robjects as robjects
>>> pi = robjects.r['pi']
>>> pi[0]
3.141592653589793

Si nos devuelve un objeto del que cogeríamos los valores en R como:
variable$nombre

En python sería
variable.rx2('nombre')


# Funciones
http://rpy.sourceforge.net/rpy2/doc-2.6/html/robjects_functions.html#robjects-functions

>>> rsum = robjects.r['sum']
>>> rsum(robjects.IntVector([1,2,3]))[0]
6L

>>> seq = robjects.r['seq']
>>> seq(1,10)
<IntVector - Python:0x7f978e04ea28 / R:0x14f0960>
[       1,        2,        3, ...,        8,        9,       10]


# Packages
import rpy2.robjects.packages as rpackages
rpackages.importr('utils')


# Convertir
De array de R a python
list(array_de_rmport rpy2.robjects.packages as rpackages)

De lista de python a array de R
robjects.FloatVector([1.1, 2.2, 3.3])
