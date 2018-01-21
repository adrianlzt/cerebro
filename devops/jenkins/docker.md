https://hub.docker.com/r/jenkins/jenkins/tags/
  esta la oficial
  doc: https://github.com/jenkinsci/docker/blob/master/README.md

docker run -p 8080:8080 -u $(id -u) -v "${PWD}/data:/var/jenkins_home" jenkins/jenkins:lts

/your/home es donde jenkins almacenara todos los datos.
Tiene que tener permisos, para que el container pueda escribir en él:
chown 1000 /your/home

# Backup
Hacer backup del dir /your/home

# Agentes externos
conectaran por el puerto 50000


# Primer arranque
Tras arrancar la primera vez escupirá una password de admin aleatoria
Tambien la podremos encontrar en: /var/jenkins_home/secrets/initialAdminPassword

Entramos en la interfaz web para terminar la configuración.
Si le pido que me enseñe los plugins más comunes falla (el JSON que devuelve parece que es muy largo y se corta)



# Docker plugin
https://wiki.jenkins-ci.org/display/JENKINS/Docker+Plugin

Usar containers de docker para lanzar ejecutores.

Una vez instalado ir a la configuración y bajar hasta "Nube" y agregar una tipo "Docker"

Podemos usar distintos métodos de conex con los slaves:

1.- attach container
Usaremos esta imagen: https://hub.docker.com/r/jenkinsci/slave/
La imagen parece que solo tiene que tener java instalado, nada más es necesario.
Connect mthod: Attach Docker container (experimental 21/01/2018)
User: Jenkins

2.- agent jlnp
Imagen: https://hub.docker.com/r/jenkins/jnlp-slave/
Parece que no funciona, porque cuando arranca la imagen pone en el CMD /bin/sh, que evita que se arranque el agente java (21/01/2018)

3.- ssh
Imagen: https://hub.docker.com/r/jenkins/ssh-slave/
Parece que no funciona si el docker host esta configurado con unix:///var/run/docker.sock (https://github.com/jenkinsci/docker-plugin/issues/455) (error intentando conectar a 0.0.0.0)

Podemos bajarnos esta imagen evarga/jenkins-slave para usarla como base.
Acceso es jenkins:jenkins

Comprobar que jenkins tiene permisos de escritura sobre el socket de docker.

Revisar los logs para ver si esta pudiendo levantar los containers y conectando a ellos.
Para conectar a ellos atacará a una IP del docker host que estara mapeada al puerto 22 del container.



# Docker build
El directorio donde le digamos que está el Dockerfile será desde el que funcionen los comandos "ADD" y "COPY".
Por lo tanto, generalmente querremos que el Dockerfile este en el root de nuestro repo.
