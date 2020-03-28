Formato aceptado para insertar datos.

subject <predicate> "object" .

Ejemplo:
_:comments.4 <comments.Id> "4" .

Si el subject comienza por "_:" es un "blank node label", representa un objecto que debe ser creado.

El "." al final indica el final del statement


Si queremos crear un edge:
_:posts.9 <posts.AcceptedAnswerId> _:posts.11075 .
