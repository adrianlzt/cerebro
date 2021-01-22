https://wiki.jenkins-ci.org/display/JENKINS/Distributed+builds

Correr agentes distintos al jenkins master para ejecutar los builds.

En docker.md es una de las formas para conectar agentes.

Si vamos a correr los agentes en docker, usaremos la imagen:
https://hub.docker.com/r/jenkins/inbound-agent


Los agentes tendrán que conectar a: http://localhost:50000
Usando el secret que hayamos definido
