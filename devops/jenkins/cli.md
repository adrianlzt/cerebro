# Ejecutar jenkins como un comando
https://github.com/jenkinsci/jenkinsfile-runner
mirar junto con custom_war.md

instalación en arch: aur jenkinsfile-runner-git

jenkinsfile-runner -w jenkins.war -p plugins/ -f ~/foo/

Si no especificamos un war (-w), en la primera ejecución se bajará la última versión estable (lo guarda en /home/adrian/.jenkinsfile-runner/war/2.222.3/jenkins-war-2.222.3.war)
Me da errores por no tener plugins parece
Para instalarnos unos plugins:
mkdir ~/.jenkins/
JENKINS_HOME=~/.jenkins/ java -jar /home/adrian/.jenkinsfile-runner/war/2.222.3/jenkins-war-2.222.3.war
http://localhost:8080/
pass en el output de la ejecución
  O en /.jenkins/secrets/initialAdminPassword

Seguramente los plugins que quiero mínimos son:
  Pipeline
  Git
  Configuration as Code


jenkinsfile-runner -f ./Jenkinsfile -p ~/.jenkins/plugins
  CUIDADO, no poner "-f Jenkinsfile", falla: https://github.com/jenkinsci/jenkinsfile-runner/issues/28
  -f ./Jenkinsfile es el valor por defecto de -f

Salen algunos warning, pero parece que tira sin problemas


Si queremos definir secrets, configs, etc:
https://github.com/jenkinsci/jenkinsfile-runner/tree/master/demo/casc
vi ~/.jenkins/jenkins.yaml

Y ejecutar con:
CASC_JENKINS_CONFIG=jenkins.yaml jenkinsfile-runner -f ./Jenkinsfile -p ~/.jenkins/plugins

CASC_JENKINS_CONFIG debe apuntar a un fichero de config .yaml
O a un directorio con las configuraciones distribuídas en varios ficheros.
Cuidado con apuntar a un directorio donde haya más ficheros yaml que no sean de CASC, porque dejará de funcionar silenciosamente.


Ejemplo con un secret y una venv
jenkins.yaml:
jenkins:
  globalNodeProperties:
    - envVars:
        env:
          - key: SOME_CASC_ENV_VAR
            value: a value configured via JCasC
credentials:
  system:
    domainCredentials:
      - credentials:
          - usernamePassword:
              scope: GLOBAL
              id: sudo_password
              username: root
              password: password


Jenkinsfile:
pipeline {
  agent any
  stages {
    stage('Zabbix prod') {
      environment {
        secreto = credentials('sudo_password')
      }
      steps {
        script {
          sh "echo Credential: ${secreto}. Variable de entorno de CasC: ${env.SOME_CASC_ENV_VAR}"
        }
      }
    }
  }
}



Con docker:
docker run --rm -v $(pwd)/Jenkinsfile:/workspace/Jenkinsfile jenkins4eval/jenkinsfile-runner
El problema es que la imagen tiene que tener todo lo que necesitas, mientras que usandolo localmente ya podemos tener cosas disponibles (como docker)




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
