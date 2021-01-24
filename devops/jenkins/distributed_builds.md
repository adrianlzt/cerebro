https://wiki.jenkins-ci.org/display/JENKINS/Distributed+builds

Correr agentes distintos al jenkins master para ejecutar los builds.

En docker.md es una de las formas para conectar agentes.

Si vamos a correr los agentes en docker, usaremos la imagen:
https://hub.docker.com/r/jenkins/inbound-agent


Para saber a donde conectar el agente iremos a la página del nodo, por ejemplo:
http://localhost:8080/computer/podman-runner0/

Ahí nos pondrá la url a conectar, ejemplo:
http://localhost:8080/computer/podman-runner0/jenkins-agent.jnlp

Y la key a usar.
