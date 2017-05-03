Interfaz web para instalar, borrar, actualizar:
JENKINSURL/pluginManager/



Los plugins suelen estar en:
https://github.com/jenkinsc/*-plugin


Si queremos modificar un plugin podemos clonar el repo y ejecutar
mvn clean package
Esto genera un fichero .hpi que podremos subir al jenkins.
Hacer el package sin pasar los tests (más rápido)
mvn clean package -DskipTests




Meter trazas
listener.getLogger().println(Messages.SSHAgentBuildWrapper_UsingCredentials(description(key)));
  estas las veo en la ejecucción

LOGGER.log(Level.WARNING, "Forced save credentials stores: Aborting due to interrupt: " + var);
  estas en el log de jenkins


