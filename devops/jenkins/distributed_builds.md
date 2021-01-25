https://wiki.jenkins-ci.org/display/JENKINS/Distributed+builds

Correr agentes distintos al jenkins master para ejecutar los builds.

En docker.md es una de las formas para conectar agentes.

Si vamos a correr los agentes en docker, usaremos la imagen:
https://hub.docker.com/r/jenkins/inbound-agent


La url será la normal de acceso a jenkins:
http://localhost:8080/

Para saber la key mirar en la web de config del nodo:
http://localhost:8080/computer/podman-runner0/

Si queremos obtener programáticament esa clave:
https://support.cloudbees.com/hc/en-us/articles/222520647-How-to-find-JNLP-Node-s-secret-key-remotely-
