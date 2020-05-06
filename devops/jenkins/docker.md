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
https://plugins.jenkins.io/docker-plugin
https://wiki.jenkins-ci.org/display/JENKINS/Docker+Plugin

Usar containers de docker para lanzar ejecutores.

Una vez instalado ir a la configuración y bajar hasta "Nube" y agregar una tipo "Docker"

Podemos usar distintos métodos de conex con los slaves:

1.- attach container
Usaremos esta imagen: https://hub.docker.com/r/jenkins/agent/
La imagen parece que solo tiene que tener java instalado, nada más es necesario.
Entiendo que la lanza docker on demand
Connect mthod: Attach Docker container (experimental 21/01/2018)
User: Jenkins

2.- agent jlnp
Imagen: https://hub.docker.com/r/jenkins/inbound-agent
Está arrancada y se conecta al master. Por ejemplo para agentes corriendo en otros nodos

3.- ssh
Imagen: https://hub.docker.com/r/jenkins/ssh-agent

Estas notas son antiguas, tal vez ssh-agent ya funciona bien.
Parece que no funciona si el docker host esta configurado con unix:///var/run/docker.sock (https://github.com/jenkinsci/docker-plugin/issues/455) (error intentando conectar a 0.0.0.0)

Podemos bajarnos esta imagen evarga/jenkins-slave para usarla como base.
Acceso es jenkins:jenkins

Comprobar que jenkins tiene permisos de escritura sobre el socket de docker.

Revisar los logs para ver si esta pudiendo levantar los containers y conectando a ellos.
Para conectar a ellos atacará a una IP del docker host que estara mapeada al puerto 22 del container.



# Docker build
El directorio donde le digamos que está el Dockerfile será desde el que funcionen los comandos "ADD" y "COPY".
Por lo tanto, generalmente querremos que el Dockerfile este en el root de nuestro repo.



# Automatizar la instalación/configuración
mirar custom_war.md

https://technologyconversations.com/2017/06/16/automating-jenkins-docker-setup/
https://gist.github.com/stuart-warren/e458c8439bcddb975c96b96bec3971b6
https://github.com/edx/jenkins-configuration
https://groups.google.com/forum/#!topic/jenkinsci-dev/NYPGvrVolak
https://pghalliday.com/jenkins/groovy/sonar/chef/configuration/management/2014/09/21/some-useful-jenkins-groovy-scripts.html
https://gist.github.com/peterjenkins1/8f8bdbc82669314f7a2cc392f48be6a0
https://github.com/Accenture/adop-jenkins/pull/17/files?short_path=04c6e90

mirar scripts.md

Se meten los scripts en /usr/share/jenkins/ref/init.groovy.d/



# Tagear imagenes de docker con el tag de git
https://stackoverflow.com/questions/30718359/how-to-tag-docker-images-with-a-git-tag-in-jenkins

En ejecutar pondremos los steps:
shell: echo "TAG=${gitlabTargetBranch#refs/tags/}" > /tmp/vars.prop
Inject environment variables: /tmp/vars.prop
Y en la imagen de docker usaremos: ${TAG}
