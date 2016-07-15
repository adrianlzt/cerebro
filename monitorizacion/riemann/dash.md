https://github.com/riemann/riemann-dash
http://riemann.io/quickstart.html
https://gist.github.com/aaronfeng/4583640 recipies

# Vistas
Grid: Nos muestra una línea por cada server, y a lo ancho los eventos que llegan con el valor de :metric. Ordenados por alfabeto.
Si dejan de llegar eventos se dejan de mostrar.

# Instalar
gem install --no-ri --no-rdoc riemann-dash

Podemos instalarlo en otro nodo. El dash solo es una serie de javascripts que se comunicarán por web sockets con el server de riemann.

# Config
https://github.com/aphyr/riemann-dash/blob/master/example/config.rb

Poner en el dir donde ejecutemos el comando.

Chequear el server. Si no estamos en la máquina tendremos que poner la ip del server, ya que nos conectaremos directamente desde el navegador al server websocket de riemann.

# Arrancar
riemann-dash

curl http://127.0.0.1:4567/

# Editar
Control+click para seleccionar un panel
'e' para editar

Para poner una vista tipo grid con todos los valores, poner en Query
true

# Queries
https://github.com/aphyr/riemann/blob/master/test/riemann/query_test.clj
