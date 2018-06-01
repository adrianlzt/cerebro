https://www.elastic.co/guide/en/elasticsearch/reference/current/array.html

Podemos almacenar arrays de elementos, excepto de objectos donde tenemos que tomar medidas especiales.


# Nested
https://www.elastic.co/guide/en/elasticsearch/reference/current/nested.html

Al definir el mapping podemos definir una propertie como "nested".
ES por debajo almacenará cada elemento del array como un documento diferente.
Luego podremos hacer búsquedas tipo:
  user.first = "John"

Siendo los datos indexados:
{
  "group" : "fans",
  "user" : [
    {
      "first" : "John",
      "last" :  "Smith"
    },
    {
      "first" : "Alice",
      "last" :  "White"
    }
  ]
}


Kibana tiene limitaciones con los nested: https://www.elastic.co/guide/en/kibana/current/nested-objects.html
  no puede hacer agregaciones con objetos nested
  no puede buscar sobre nested objects si usamos lucene syntax en la barra de búsqueda
