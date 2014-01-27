http://juliastats.github.io/DataFrames.jl/

No viene por defecto.

Para instalar: 
Pkg.add("DataFrames")

Para usar: 
using DataFrames


df = readtable("LOG",separator=' ',header=false)
Me parsea un fichero de texto separado por espacios en una matriz

df[1:2,5:8]
Me saca de las dos primeras filas las columnas 5,6,7 y 8

df = readtable("LOG",separator=' ',header=false,colnames=["host","na","na2","date","timezone","request","status","bytes","url","browser"])
Asignando nombres a las columnas

julia> df["host"]
2-element DataArray{UTF8String,1}:
 "10.95.26.66"
  "1.5.6.6"  


julia> size(df)
(2,10)


