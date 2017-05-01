# CLI
http://JENKINSSERVER/cli/

CLI para lanzar con java y modificar, crear, etc

Intentará usar nuestra clave SSH.

Entrar en http://jenkins/me/configure para poner nuestra clave ssh pública

## JAR
java -jar jenkins-cli.jar -s http://jenkinsserver/ set-build-result RESULT
Establece el resultado del trabajo actual. Sólo se puede ejecutar desde un build.
  RESULT puede ser: ABORTED FAILURE NOT_BUILT SUCCESS UNSTABLE

## SSH
https://wiki.jenkins-ci.org/display/JENKINS/Jenkins+SSH

Ejecutar comandos cli en jenkins via ssh.
ssh -p 38844 usuario@example.com who-am-i

Para obtener el puerto:
curl -s -D - example.com | grep SSH
X-SSH-Endpoint: example.com:52658


## Pasar variables entre steps
step1: echo "PEPE=3" > env.properties
step2: Inject environment variables
       Properties File Path: env.properties
step3: echo "PEPE=${PEPE}"
