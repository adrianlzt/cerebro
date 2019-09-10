Mirar "escalating privileges" en el administration cookbook.

Cuidado los el search_path.
Podríamos, como dbas, intentar ejecutar una función en un schema, pero si el schema "public" lo tenemos delante en el search_path, podríamos estar ejecutando una función creada por un usuario malicioso.
Es lo mismo que si en unix un usuario nos mete un binario malicoso "ls" en un directorio PATH con más prioridad con /bin
