En el fichero .ssh/authorized_keys delante de la clave ponemos el comando a ejecutar:

Ejemplo:
command="id" ssh-rsa Cz7ilGdxvJjHbUy0EdT... 

Cuando esa clave intente conectarse a la máquina se ejecutará ese comando y se saldrá.

Mirar logging.md para ver un ejemplo más currado para logueando que comandos se ejecutan.
