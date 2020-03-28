El schema es el formato de los predicates (datos).

Pueden ser:
  string
  float
  int
  geo
  dateTime
  bool
  uid

El tipo "uid" se usa para crear las relaciones (edges) con otros nodos.
Puede ser del tipo "[uid]" para indicar relaciones 1-N


# Custom data type / type system
Dgraph’s v1.1 release introduced type system feature. This feature made it possible to create custom data types by grouping one or more predicates


# Dump schema
Desde ratel podemos sacar un dump del schema actual.
Schema -> bulk edit
