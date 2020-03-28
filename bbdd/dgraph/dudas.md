Parece que tiene el mismo problema de elasticsearch, que crear distintos tipos de datos sobre la misma database no parece buena idea, porque podemos tener conflictos de predicates que quieran tener distintos tipos de datos.

Como obtenmos todos los predicates de un nodo?

En ravel no se pueden escribir varias queries seguidas y que solo se ejecute la que esté seleccionada (como en kibana con la dev console)?

La directiva @filter necesita indexar los campos por los que filtra. En el tutorial dice que si, pero en mi prueba con la 2.0beta1 me ha funcionado sin idexar el campo.

Que es dgraph alpha y que zero?

Como podemos a volver a hacer un bulk import evitando duplicar registros?
