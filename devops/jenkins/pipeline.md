https://jenkins.io/doc/book/pipeline/getting-started/
https://jenkins.io/doc/book/pipeline/jenkinsfile/
https://go.cloudbees.com/docs/cloudbees-documentation/use/reference/pipeline/
https://jenkins.io/doc/pipeline/steps/
https://jenkins.io/doc/book/pipeline/syntax/

Hay dos tipos (https://jenkins.io/doc/book/pipeline/syntax/#compare):
   Declarative Pipeline, empieza con "pipeline {". Más sencilla
   Scripted Pipeline -> empieza por "node {", es groovy. Más potente https://jenkins.io/doc/book/pipeline/syntax/#scripted-pipeline
   mirar abajo del todo para ver que steps tenemos para scripted pipeline

Syntax
https://jenkins.io/doc/book/pipeline/syntax/
http://groovy-lang.org/semantics.html
http://localhost:8080/pipeline-syntax/
  aquí hay una utilidad para ayudarnos a crear el Jenkinsfile. La cantidad de opciones dependerá de los plugins instalados.

Todos los steps que se proveen en todos los plugins de jenkins disponibles
https://jenkins.io/doc/pipeline/steps

Ejemplos
https://jenkins.io/doc/pipeline/examples

Ejemplo de scripted pipeline:
scripted_pipeline.groovy
https://github.com/jenkins-infra/jenkins.io/blob/c0828af5b8bd428815e23537c808cd0267017013/Jenkinsfile
https://github.com/MarkEWaite/docker-lfs/blob/lts-with-plugins/Jenkinsfile


Plugin
https://plugins.jenkins.io/workflow-aggregator


Usaremos un fichero Jenkinsfile en el repositorio (Pipeline script from SCM), que se cargará automáticamente para crear el job tipo Pipeline
Este job si lo tendremos que crear a mano en Jenkins.


# Comentarios
// texto


# Triggers
## Scripted (fuera de "node")
https://stackoverflow.com/questions/43510110/jenkins-pipelinetriggers-option-crashes
  properties ([
    pipelineTriggers ([
       gitlab(
         triggerOnPush: true,
         triggerOnMergeRequest: true,
         noteRegex: "Jenkins please retry a build",
         setBuildDescription: true,
         branchFilterType: 'All',
         secretToken: '##DONOTCHANGE##'
       )
    ])
  ])


## Declarative (dentro de "pipeline")
      triggers {
         gitlab(
           triggerOnPush: true,
           triggerOnMergeRequest: true,
           noteRegex: "Jenkins please retry a build",
           setBuildDescription: true,
           branchFilterType: 'All',
           secretToken: '##DONOTCHANGE##'
         )
      }


# Agent
Elegir donde ejecutar

## scripted
node("docker") { ... }

## declarative
pipeline {
    agent {
        label "docker"
    }
    ...
}


# Auth / credentials
https://jenkins.io/doc/pipeline/steps/credentials-binding/

## Scripted
https://jenkins.io/doc/pipeline/steps/credentials-binding/#withcredentials-bind-credentials-to-variables
node {
  withCredentials([usernameColonPassword(credentialsId: 'mylogin', variable: 'USERPASS')]) {
    sh '''
      set +x
      curl -u $USERPASS https://private.server/ > output
    '''
  }
}

## Declarativg
stage('Push') {
    steps {
        withCredentials([usernamePassword(credentialsId: 'docker_localhost_registry', passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]) {
            sh "make push"
        }
    }
}


# Condicionales

## Scripted
node {
    stage('Example') {
        if (env.BRANCH_NAME == 'master') {
            echo 'I only execute on the master branch'
        } else {
            echo 'I execute elsewhere'
        }
    }
}


## Declarative
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



# Errores try-catch (para scripted)
node {
    stage('Example') {
        try {
            sh 'exit 1'
        }
        catch (exc) {
            echo 'Something failed, I should sound the klaxons!'
            throw
        }
    }
}




# Variables de entorno
https://github.com/jenkinsci/pipeline-model-definition-plugin/wiki/Environment-variables

    environment {
        FOO = "BAR"
        BAZ = "bang"
        AWS_ACCESS_KEY_ID = credentials('AWS_ACCESS_KEY_ID')
    }

Podemos usarlas en cualquier parte como: env.FOO
O en script sh con ${FOO}



# Post

## Scripted
try {
  node {
    ...
    al final ponemos el "success"
  }
} catch (exc) {
  aqui ponemos el "failure"
}


## Declarative
Ejecutar algo al terminar
  post {
      failure {
          ...
      }
      success {
          ...
      }
  }




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



## Crear nuestra shared lib
Podemos meter el código en src/foo/bar/*.groovy o en vars/foo.groovy
Si metemos por ejemplo:
  vars/foo.groovy:
    def call(msg) {
      echo "hola ${msg}"
    }

  vars/log.groovy:
    def info(msg) {
      echo "INFO: ${msg}"
    }

Desde nuestro scripted pipeline lo usaremos como:
node {
   log.info "esto es info"
   foo "pepito"
}



Tambien podemos que la shared lib ya tenga definido el "node", y asi solo pondremos en el Jenkinsfile algo tipo:
miCommonBuild param1: "value1"

En la shared lib, de nombre miCommonBuild.groovy, tendremos algo tipo:
def call(Map config) {
    node {
        sh 'hostname ${config.param1}'
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




# Scripted pipeline
Steps que me muestra (al meter algo mal)
acceptGitLabMR
 addGitLabMRComment
 archive
 bat
 build
 catchError
 checkout
 deleteDir
 dir
 dockerFingerprintFrom
 dockerFingerprintRun
 dockerNode
 echo
 emailext
 emailextrecipients
 envVarsForTool
 error
 fileExists
 getContext
 git
 gitlabBuilds
 gitlabCommitStatus
 httpRequest
 input
 isUnix
 jiraComment
 jiraIssueSelector
 jiraSearch
 junit
 library
 libraryResource
 load
 mail
 mattermostSend
 milestone
 node
 parallel
 powershell
 properties
 publishHTML
 pwd
 readFile
 readTrusted
 resolveScm
 retry
 script
 sh
 sleep
 stage
 stash
 step
 timeout
 timestamps
 tm
 tool
 unarchive
 unstash
 updateGitlabCommitStatus
 validateDeclarativePipeline
 waitUntil
 withContext
 withCredentials
 withDockerContainer
 withDockerRegistry
 withDockerServer
 withEnv
 wrap
 writeFile
 ws

symbols
 all
 allOf
 always
 ant
 antFromApache
 antOutcome
 antTarget
 any
 anyOf
 apiToken
 architecture
 archiveArtifacts
 artifactManager
 attach
 authorizationMatrix
 batchFile
 bitbucket
 booleanParam
 branch
 buildButton
 buildDiscarder
 caseInsensitive
 caseSensitive
 certificate
 changelog
 changeset
 checkoutToSubdirectory
 choice
 choiceParam
 cleanWs
 clock
 cloud
 command
 credentials
 cron
 crumb
 defaultView
 demand
 disableConcurrentBuilds
 disableResume
 docker
 dockerCert
 dockerfile
 downloadSettings
 downstream
 dumb
 durabilityHint
 envVars
 environment
 expression
 file
 fileParam
 filePath
 fingerprint
 frameOptions
 freeStyle
 freeStyleJob
 fromScm
 fromSource
 git
 gitLabConnection
 github
 githubPush
 gitlab
 gradle
 headRegexFilter
 headWildcardFilter
 hyperlink
 hyperlinkToModels
 inheriting
 inheritingGlobal
 installSource
 jdk
 jdkInstaller
 jgit
 jgitapache
 jnlp
 jobName
 label
 lastDuration
 lastFailure
 lastGrantedAuthorities
 lastStable
 lastSuccess
 legacy
 legacySCM
 list
 local
 location
 logRotator
 loggedInUsersCanDoAnything
 masterBuild
 maven
 maven3Mojos
 mavenErrors
 mavenMojos
 mavenWarnings
 modernSCM
 myView
 node
 nodeProperties
 nonInheriting
 nonStoredPasswordParam
 none
 not
 overrideIndexTriggers
 paneStatus
 parameters
 password
 pattern
 pipeline-model
 pipelineTriggers
 plainText
 plugin
 pollSCM
 projectNamingStrategy
 proxy
 queueItemAuthenticator
 quietPeriod
 remotingCLI
 run
 runParam
 schedule
 scmRetryCount
 search
 security
 shell
 skipDefaultCheckout
 skipStagesAfterUnstable
 slave
 sourceRegexFilter
 sourceWildcardFilter
 ssh
 sshUserPrivateKey
 stackTrace
 standard
 status
 string
 stringParam
 swapSpace
 text
 textParam
 tmpSpace
 toolLocation
 unsecured
 upstream
 usernameColonPassword
 usernamePassword
 viewsTabBar
 weather
 withAnt
 zfs
 zip


 Globals:
 adri
 commonBuild
 currentBuild
 docker
 env
 log
 notify
 params
 pipeline
 scm]
