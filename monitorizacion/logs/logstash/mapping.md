https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping.html

# Analyed fields
Por defecto cuando se detecta el tipo de cada field se marca como "analyzed field", de modo que si el campo es "valor-otra-cosa" lo partirá en tres trozos.
Si no queremos que haga esto tendremos que modificar ese field para que no lo analice. Esto se hace con la mapping API:




