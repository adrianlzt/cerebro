En SQL normalmente tratamos de normalizar los datos. Tablas con los mismos datos con relaciones con otras tablas.
En ES hacemos lo contrario, desnormalizar los datos. Docs planos con todos los datos.
  Mejoras: indexing and searching fast, no necesitamos joins ni locks en tablas.

Algunas veces necesitamos relaciones, tenemos estas opciones (de mejor a peor):
  Denormalizing: flatten your data (typically the best solution)
    almacenando copias redundantes de los datos en cada doc (_source se comprimer, evita gastar mucho disco)
    Ej.: tweets and users, denormalizing implica en cada tweet meter la info del user
    Hace las lecturas más eficientes
    No se puede mantener esos datos duplicados consistentes, por lo que no es aconsejable para datos que cambian mucho
  Application-side joins: run multiple queries on normalized data
  Nested objects: for working with arrays of objects
    mirar nested.md
  Parent/child relationships
    útil si tenemos que actualizar los docs frecuentemente
    mirar parent_child.md

Como saber que tecnica utilizar: data_model_relationship.png
