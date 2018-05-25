https://docs.docker.com/engine/userguide/labels-custom-metadata/
https://docs.docker.com/engine/reference/commandline/run/#set-metadata-on-container--l---label---label-file

$ docker run -l my-label --label com.example.foo=bar ubuntu bash


# Modificar labels
No es posible a priori sin destruir el container

Una solución es para dockerd, editar el fichero /var/lib/docker/containers/bc9c32c877c3a9c05557503b0e195821c71f988f59b7ddf34d35017efbc63cfc/config.v2.json y arrancar de nuevo.
Configurando docker para no parar los containers cuando dockerd se reinicia podría ser una solución válida.


Otra solución, arriesgada, es usar un editor de memoria (gameconqueror por ejemplo) y tratar de acertar a modificar el valor, teniendo que ser la modificación del mismo tamaño.
Si modifiamos la memoria y corrompemos la estructura donde almacena la info del container corremos el riesgo de perder el container y que no vuelva a aparecer.

Por si acaso hacer un backup del fichero config.v2.json
Recordar que config.v2.json es un diccionario, no un array, porque "docker inspect" lo saca en un array
