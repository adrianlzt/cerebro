Entrar en la imagen
docker run -ti nombre /bin/bash
hacer los cambios necesarios
docker commit <container> adrianlzt/nombre
docker run ... adrianlzt/nombre comando original
docker stop <container>
docker commit <container> adrianlzt/nombre

Alguna manera de no tener que hacer el segundo run para modificar el comando? Por que este run ha ejecuta la app y tal vez ya ha creado cosas que no queriamos.
