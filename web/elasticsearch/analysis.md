https://www.elastic.co/guide/en/elasticsearch/guide/current/inverted-index.html
https://www.elastic.co/guide/en/elasticsearch/guide/current/analysis-intro.html

Cuando se indexa y se busca se convierten las palabras a sus formas normalizadas (se coje la raíz).
zorros -> zorro
Zorro -> zorro

jumps/jumping -> jump

De esta manera conseguimos mejores búsquedas

También se eliminan las "stop words". Palabras no útiles, por ejemplo "the"


Se pueden crear sinónimos para nuestra casuística particular.
