Interfaz web para instalar, borrar, actualizar:
JENKINSURL/pluginManager/



Los plugins suelen estar en:
https://github.com/jenkinsc/*-plugin


Si queremos modificar un plugin podemos clonar el repo y ejecutar
mvn clean package
Esto genera un fichero .hpi que podremos subir al jenkins.
Hacer el package sin pasar los tests (más rápido)
mvn clean package -DskipTests


# Recomendadas
blue ocean (nueva interfaz grafica)
https://wiki.jenkins-ci.org/display/JENKINS/Green+Balls (green balls)
https://wiki.jenkins-ci.org/display/JENKINS/Naginator+Plugin (retry)
https://wiki.jenkins-ci.org/display/JENKINS/Show+Build+Parameters+Plugin (show build params)


# Debug
Meter trazas
listener.getLogger().println(Messages.SSHAgentBuildWrapper_UsingCredentials(description(key)));
  estas las veo en la ejecucción

import java.util.logging.Level;
import java.util.logging.Logger;
private static final Logger LOGGER = Logger.getLogger(CredentialsProvider.class.getName());

LOGGER.log(Level.WARNING, "Forced save credentials stores: Aborting due to interrupt: " + var);
  estas en el log de jenkins




# Archivo
Podemos encontrar las versiones antiguas
http://updates.jenkins-ci.org/download/plugins/



# Develop
https://wiki.jenkins.io/display/JENKINS/Plugin+tutorial
https://github.com/jenkinsci/hello-world-plugin
https://wiki.jenkins.io/display/JENKINS/Architecture
http://code.hootsuite.com/how-to-write-a-jenkins-plugin/
https://cleantestcode.wordpress.com/category/jenkins-plugins/
http://code.dblock.org/2011/09/07/implementing-my-first-jenkins-plugin-ansicolor.html


# Estructura
src/main/groovy, src/main/resources
Aqui encontraremos las vistas (en groovy o jelly)

src/java
El codigo del plugin

src/webapp
Recursos estáticos: CSS, JS, HTML, imágenes


# Punto de union
https://wiki.jenkins.io/display/JENKINS/Plugin+tutorial#Plugintutorial-Extensionpointsapproach
El plugin usa "@Extension" para extender alguna de las funcionalidades.
Lista de donde podemos extender: https://jenkins.io/doc/developer/extensions/

Podemos buscar por "@Extension" para ver que hace el plugin.



# URL -> funciones
El bound entre URL y funciones se hace con Stapler.
Tomando como ejemplo el plugin que retorna badges:
https://github.com/jenkinsci/embeddable-build-status-plugin/blob/master/src/main/java/org/jenkinsci/plugins/badge/BadgeAction.java

La url para obtener el badge (la forma protected, que seria lo más normal de uso con Stapler):
https://jenkins.example/job/test/2/badge/icon?style=flat
getUrlName() parece que define que se tiene que poner "/badge/"
Luego como hemos puesto "/icon" buscará la función: doIcon (o getIcon)
El parametro "style" se pasará al poner: "@QueryParameter String style"

