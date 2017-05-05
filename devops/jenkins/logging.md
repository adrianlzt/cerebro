http://JENKINSURL/log/all
Logs del servidor

http://JENKINSURL/log/level
modificar el nivel de log de cada cosa
Pero no parece que esto modifique el logging que sale en los "Console log"

Para saber que debemos poner ahi iremos al repo:

Por ejemplo, para git es: hudson.plugins.git porque sus ficheros estan en https://github.com/jenkinsci/git-plugin/tree/master/src/main/java/hudson/plugins/git


# Logs que salen en los jobs
Se escriben asi:
listener.getLogger().println("Cloning the remote Git repository");

Ese getLogger viene de aqui:
https://github.com/jenkinsci/jenkins/blob/master/core/src/main/java/hudson/util/LogTaskListener.java#L51

Su nivel se define aqui:
https://github.com/jenkinsci/jenkins/blob/master/core/src/main/java/hudson/util/LogTaskListener.java#L47
https://github.com/jenkinsci/jenkins/blob/c362bfc8c7439f095591453688f3da8752a04fb3/core/src/main/java/jenkins/model/Jenkins.java#L978
cl.onOnline(c, new LogTaskListener(LOGGER, INFO));
https://github.com/jenkinsci/jenkins/commit/68fbc8c664411ca4b6137e1a787692d0b540ad95 (donde pusieron el info por primera vez)
