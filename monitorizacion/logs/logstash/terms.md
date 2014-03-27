Gráficas Kibana con "terms".

Genéra gráfica sobre valores de algún campo.

Ejemplo, número de usuarios:
  terms mode: terms
  Filed: name <- o como se llame el campo que tenga el nombre del usuario
  Length: 10 <- muestra los 10 usuarios que más se conecten
  Order: count <- si cambiamos, a por ejemplo, term, ordenará por orden alfabético, y el length querra decir que mostramos los usuarios hasta a,b,c..., 10 primeras letras


