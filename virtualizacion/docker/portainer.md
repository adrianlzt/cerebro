http://portainer.io/

Interfaz web para administrar un cluster docker con swarm

Ejecutar portainer con persistencia de los datos y con el socket de docker para manejar el docker host donde corre:
docker run -d -p 9000:9000 -v /path/on/host/data:/data -v "/var/run/docker.sock:/var/run/docker.sock" portainer/portainer
