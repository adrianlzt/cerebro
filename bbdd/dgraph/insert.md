Para modificar datos mirar update.md

DGraph generará automáticamente el schema a partir de los datos introducidos.
mirar schema.md

Cuando insertamos datos, podemos hacer uso de los "blank node labels" para referenciar objetos entre si. Pero no lo podremos reusar una vez ya están insertados.
Ejemplo correcto:
_:posts.11075   <posts.Body>                "<p>When I was in..." .
_:posts.9       <posts.Body>                "<p>I try to use..." .
_:posts.9 <posts.AcceptedAnswerId> _:posts.11075 .

Ejemplo incorrecto:
  primer mutate
    _:posts.11075   <posts.Body>                "<p>When I was in..." .
    _:posts.9       <posts.Body>                "<p>I try to use..." .
  segundo mutate:
    _:posts.9 <posts.AcceptedAnswerId> _:posts.11075 .

En el segundo mutate "_:posts.11075" ha perdido su significado

The blank node labels _:class, _:x and _:y do not identify the nodes after the mutation, and can be safely reused to identify new nodes in later mutations.


# RDF
{
 set {
    _:class <student> _:x .
    _:class <student> _:y .
    _:class <name> "awesome class" .
    _:class <dgraph.type> "Class" .
    _:x <name> "Alice" .
    _:x <dgraph.type> "Person" .
    _:x <dgraph.type> "Student" .
    _:x <planet> "Mars" .
    _:x <friend> _:y .
    _:y <name> "Bob" .
    _:y <dgraph.type> "Person" .
    _:y <dgraph.type> "Student" .
 }
}

# JSON
Los datos los insertaremos con un json, bajo la key "set".

{
  "set": [
    {
      "name": "Karthic",
      "age": 28,
      "follows": {
        "name": "Jessica",
        "age": 31
      }
    }
  ]
}


Podemos usar blank node labels para asignar unos uids temporales para poder relacionar datos entre si en el mismo mutate:

{
  "set": [
    {
      "uid": "_:nombretemporal",
      ...


Meter una dependencia a un blank node label:
"depends_on": [{"uid": "_:trigger.210000"}]
