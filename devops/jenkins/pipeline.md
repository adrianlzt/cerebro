https://jenkins.io/doc/book/pipeline/getting-started/
https://jenkins.io/doc/book/pipeline/jenkinsfile/
https://go.cloudbees.com/docs/cloudbees-documentation/use/reference/pipeline/
https://jenkins.io/doc/pipeline/steps/
https://jenkins.io/doc/book/pipeline/syntax/

Hay dos tipos:
   Declarative Pipeline, empieza con "pipeline {"
   Scripted Pipeline -> empieza por "node {", es groovy

Syntax
https://jenkins.io/doc/book/pipeline/syntax/
http://groovy-lang.org/semantics.html
http://localhost:8080/pipeline-syntax/
  aquí hay una utilidad para ayudarnos a crear el Jenkinsfile. La cantidad de opciones dependerá de los plugins instalados.

Todos los steps que se proveen en todos los plugins de jenkins disponibles
https://jenkins.io/doc/pipeline/steps

Ejemplos
https://jenkins.io/doc/pipeline/examples

Plugin
https://plugins.jenkins.io/workflow-aggregator


Usaremos un fichero Jenkinsfile en el repositorio (Pipeline script from SCM), que se cargará automáticamente para crear el job tipo Pipeline
Este job si lo tendremos que crear a mano en Jenkins.


# Comentarios
// texto


# Auth / credentials
https://jenkins.io/doc/pipeline/steps/credentials-binding/

stage('Push') {
    steps {
        withCredentials([usernamePassword(credentialsId: 'docker_localhost_registry', passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]) {
            sh "make push"
        }
    }
}


# Condicionales
https://jenkins.io/blog/2017/01/19/converting-conditional-to-pipeline/

    stages {
        stage ('Speak') {
            when {
                // Only say hello if a "greeting" is requested
                expression { params.REQUESTED_ACTION == 'greeting' }
            }
            steps {
                echo "Hello, bitwiseman!"
            }
        }
    }

Si usamos variables de entorno ponerlas como: env.FOO
Si ponemos en un expression solo "FOO", saltará excepcion si no está declarada. Con env.FOO dará null si no está declarada.



# Variables de entorno
https://github.com/jenkinsci/pipeline-model-definition-plugin/wiki/Environment-variables

    environment {
        FOO = "BAR"
        BAZ = "bang"
        AWS_ACCESS_KEY_ID = credentials('AWS_ACCESS_KEY_ID')<Paste>
    }

Podemos usarlas en cualquier parte como: env.FOO
O en script sh con ${FOO}



# Primera ejecucción
En la primera ejecucción la job le faltan algunos datos que están en el propio Jenkinsfile
Parece que es una issue aún no resuelta (23/1/2018)
https://issues.jenkins-ci.org/browse/JENKINS-40574
https://issues.jenkins-ci.org/browse/JENKINS-41929


# Definir funciones propias / shared libraries
https://stackoverflow.com/a/45990450/1407722
https://jenkins.io/doc/book/pipeline/shared-libraries/

Ejemplo de global var: https://github.com/jalogut/jenkins-basic-shared-library-sample
Lib de fabric8 con ejemplos reales: https://github.com/fabric8io/fabric8-pipeline-library

def notifyStatusChangeViaEmail(buildStatus) {
    // codigo groovy
}
pipeline {
    post {
        changed {
            notifyStatusChangeViaEmail(currentBuild.currentResult)
        }
    }
}



# Build de otra job
build job: 'downstream-freestyle', parameters: [[$class: 'StringParameterValue', name: 'ParamA', value: paramAValue], [$class: 'StringParameterValue', name: 'ParamB', value: paramBValue]]

build job: 'your-job-name',
    parameters: [
        string(name: 'passed_build_number_param', value: String.valueOf(BUILD_NUMBER)),
        string(name: 'complex_param', value: 'prefix-' + String.valueOf(BUILD_NUMBER))
    ]



# Peticinones http
Hay que instalar el plugin HTTP Request
response = httpRequest consoleLogResponseBody: true, contentType: 'APPLICATION_JSON', httpMode: 'POST', requestBody: toJson(body), url: "https://${host}", validResponseCodes: '200'

