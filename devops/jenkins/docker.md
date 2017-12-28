https://hub.docker.com/r/jenkins/jenkins/tags/
  esta la oficial
  doc: https://github.com/jenkinsci/docker/blob/master/README.md

docker run -p 8080:8080 -p 50000:50000 -v /your/home:/var/jenkins_home jenkins/jenkins:lts

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
version 0.16.2 no acepta conex con unix:// (la version 0.16.1 si) https://github.com/jenkinsci/docker-plugin/issues/471

Usar containers de docker para lanzar ejecutores.

Una vez instalado ir a la configuración y bajar hasta "Nube" y agregar una tipo "Docker"

Podemos bajarnos esta imagen evarga/jenkins-slave para usarla como base.
Acceso es jenkins:jenkins

Comprobar que jenkins tiene permisos de escritura sobre el socket de docker.

Revisar los logs para ver si esta pudiendo levantar los containers y conectando a ellos.
Para conectar a ellos atacará a una IP del docker host que estara mapeada al puerto 22 del container.



# Docker build
El directorio donde le digamos que está el Dockerfile será desde el que funcionen los comandos "ADD" y "COPY".
Por lo tanto, generalmente querremos que el Dockerfile este en el root de nuestro repo.
