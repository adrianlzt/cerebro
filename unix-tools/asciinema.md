Grabar una sesion de una terminal

Instalar
pacman asciinema


Login
En la web, solicitar login poniendo nuestro email.
Una vez logeuados, en la terminal
asciinema auth

Poner la url en el mismo navegador


# Grabar
asciinema rec


Se grabará con la velocidad que lo estamos haciendo.
Al terminar nos preguntará si queremos salvarlo online.

También podemos guardarlos en local.
Es un fichero json con timestams y lo que debe hacer en pantalla.


# Playback
asciinema play https://asciinema.org/a/25hebBQFGJcVHjQkzzqdMwByt

Veremos como si estuviesemos ejecutando las cosas nosotros en local, pero no se realizará ningún cambio, ni podemos interactuar


# cat
asciinema cat somerec

Imprime todo seguido.
Si tenemos aperturas de pantallas ncurses, por ejemplo vi, veremos un destello de su carga y luego como se va de la pantalla.
