Los ficheros de pid y lock deben estar localizados en cada uno de los nodos.
NO deben ser ficheros compartidos.

Si son compartidos pueden provocar fallos a la hora de intentar determinar si el proceso está corriendo (ya que el pid no coincidirá en uno de los nodos)
