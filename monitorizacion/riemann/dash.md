# Vistas
Grid: Nos muestra una línea por cada server, y a lo ancho los eventos que llegan con el valor de :metric. Ordenados por alfabeto.
Si dejan de llegar eventos se dejan de mostrar.

# Instalar
gem install riemann-dash

# Config
https://github.com/aphyr/riemann-dash/blob/master/example/config.rb

Poner en el dir donde ejecutemos el comando.

Chequear el server. Si no estamos en la máquina tendremos que poner la ip del server, ya que nos conectaremos directamente desde el navegador al server websocket de riemann.

# Editar
Control+click para seleccionar un panel
'e' para editar


# Queries
https://github.com/aphyr/riemann/blob/master/test/riemann/query_test.clj
