## MySQL indexes http://dev.mysql.com/doc/refman/5.0/es/mysql-indexes.html ##
Most MySQL indexes (PRIMARY KEY, UNIQUE, INDEX, and FULLTEXT) are stored in B-trees. Exceptions are that indexes on spatial column types use R-trees, and that MEMORY tables also support hash indexes.
http://en.wikipedia.org/wiki/B-tree
B-Tree != Binary Tree


## Inverted index http://en.wikipedia.org/wiki/Inverted_index ##
T[0] = "it is what it is"
T[1] = "what is it"
T[2] = "it is a banana"

--tras-el-inverted-index-->

"a":      {2}
"banana": {2}
"is":     {0, 1, 2}
"it":     {0, 1, 2}
"what":   {0, 1}

Este tipo es el record level inverted index (or inverted file index or just inverted file)


El word level inverted index (or full inverted index or inverted list) almacena también la posición de la palabra en la frase:
"a":      {(2, 2)}
"banana": {(2, 3)}
"is":     {(0, 1), (0, 4), (1, 1), (2, 1)}
"it":     {(0, 0), (0, 3), (1, 2), (2, 0)} 
"what":   {(0, 2), (1, 0)}
