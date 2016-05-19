Since Docker 1.3 you can use exec to run a process in a running container. Start your container as you 'd normally do, and then enter it by issuing:
docker exec -it $CONTAINER_ID /bin/bash

mirar attach

Si quiero entrar a una imagen pero tiene un entrypoint y no me deja con el típico: docker run -t -i imagen /bin/bash, puedo hacer:
docker run -t -i --entrypoint="/bin/bash" imagen -i
