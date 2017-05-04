https://packagedrone.org/
https://github.com/eclipse/packagedrone
https://projects.eclipse.org/projects/technology.package-drone
http://doc.packagedrone.org/javadoc/

Gestor de artefactos

# Configuración
Una vez entramos por primera vez como admin, crear un usuario, darle a editar y ponerle como MANAGER
El usuario admin no puede crear channels, solo los users MANAGER

# Docker
https://hub.docker.com/r/adrianlzt/packagedrone/

docker run -v "$PWD/data:/var/lib/package-drone-server/storage" -p 8090:8080 --rm -it adrianlzt/packagedrone

En los logs aparece la password de admin


# Jenkins
Plugin para subir artefactos desde jenkins
https://wiki.jenkins-ci.org/display/JENKINS/Package+Drone+Plugin


# YUM
En Help -> YUM tenemos la info para configurar el canal.

# API Upload
https://github.com/eclipse/packagedrone/blob/master/bundles/org.eclipse.packagedrone.repo.api/README.md

Cuando tenemos un canal creado, podemos ir a la pestaña Help -> Upload para ver como usar la api

Ejemplo:
https://packagedrone.eclipse.org/channel/592fef0c-cb19-40d4-85ee-751f40a14196/help/api
curl -X PUT --data-binary @my.jar https://deploy:xxxxx@packagedrone.eclipse.org/api/v3/upload/plain/channel/592fef0c-cb19-40d4-85ee-751f40a14196/my.jar

curl -X PUT --data-binary @some.rpm http://deploy:xxx@172.17.0.7:8080/api/v3/upload/plain/channel/canal/some.rpm

Con archive no me funciona, no sube nada.

Debemos crear un deploy group que asociaremos al channel (desde la conf del channel). Luego crearemos la deploy key en ese deploy group.
