https://docs.docker.com/docker-hub/builds/#create-an-automated-build
http://blog.docker.io/2013/11/introducing-trusted-builds/

Relacionar proyecto en github con index.docker.io
Con un hook, cuando hagamos un commit, se genera de nuevo la imagen en el index.


Tenemos que crear el repo desde hub.docker y apuntar a nuestro repo.
En Build Settings podemos configurar para que haga uso de las tags.
Cada tag de git taggeara una version de la imagen.
