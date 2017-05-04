https://packagedrone.org/
https://github.com/eclipse/packagedrone
https://projects.eclipse.org/projects/technology.package-drone
http://doc.packagedrone.org/javadoc/

Gestor de artefactos

# Configuración
Una vez entramos por primera vez como admin, crear un usuario, darle a editar y ponerle como MANAGER
El usuario admin no puede crear channels, solo los users MANAGER

# Docker
https://hub.docker.com/r/ctron/packagedrone/

docker run --rm -it -p 9080:8080 ctron/packagedrone:latest

En los logs aparece la password de admin


# Jenkins
Plugin para subir artefactos desde jenkins
https://wiki.jenkins-ci.org/display/JENKINS/Package+Drone+Plugin


# YUM
En Help -> YUM tenemos la info para configurar el canal.

# API Upload
Cuando tenemos un canal creado, podemos ir a la pestaña Help -> Upload para ver como usar la api

Ejemplo:
https://packagedrone.eclipse.org/channel/592fef0c-cb19-40d4-85ee-751f40a14196/help/api
curl -X PUT --data-binary @my.jar https://deploy:xxxxx@packagedrone.eclipse.org/api/v3/upload/plain/channel/592fef0c-cb19-40d4-85ee-751f40a14196/my.jar

