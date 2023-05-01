Funcionalidad para extraer info de la Wikipedia

Ejemplo:
```
from langchain import Wikipedia
w = Wikipedia()
w.search("plutarco")
```

Se suele usar con "DocstoreExplorer". Este lo que hace es devolver únicamente el primer párrafo (corte hasta \n\n) y luego permitirnos
buscar de nuevo con "lookup" sobre el último documento que nos hayamos descargado.
```
from langchain.agents.react.base import DocstoreExplorer
docstore=DocstoreExplorer(Wikipedia())
docstore.search("arquimedes") # nos devolverá el primer párrafo
docstore.lookup("last words") # nos devolverá el primer párrafo que contenga "last words"
```

Si seguimos llamando a "lookup" con el mismo parámetro, nos seguirá dando otros párrafos que contengan esa cadena.
