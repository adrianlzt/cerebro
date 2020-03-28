https://docs.docker.com/engine/reference/builder/
https://docs.docker.com/engine/userguide/eng-image/dockerfile_best-practices/#use-a-dockerignore-file

Como el .gitignore
Son los ficheros que no se tienen en cuenta al hacer un build (para ADD y COPY)
Docker envia todos los ficheros al daemon si no están aqui


.dockerignore

Ejemplo para ignorar todo menos fichero go:
*
!*.go
!go.mod
!go.sum
