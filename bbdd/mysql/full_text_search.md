https://dev.mysql.com/doc/refman/5.7/en/fulltext-search.html

Creamos un campo full text que usa como base un campo text de la tabla.
Según el artículo de hackernoon, muy lento cuando intentamos hacer queries full text con otros filtros.

Ejemplo:
https://hackernoon.com/dont-waste-your-time-with-mysql-full-text-search-61f644a54dfa?gi=d8765bd2c584

SELECT TABLE document (
  id int PRIMARY KEY,
  content longtext NOT NULL,
  FULLTEXT KEY (content)
)


SELECT id
FROM document
WHERE MATCH(content) AGAINST ('commercial' IN BOOLEAN MODE)
LIMIT 50
