Herramienta de continous integration
La idea del 'continous integration' es la de que multiples desarrolladores están editando el mismo código. Con jenkins comprobamos que todo sigue compilando y pasa los tests.
La idea es que los desarrolladores comiteen los cambios cada día o dos, entonces se testee todo automaticamente.
La idea de enviar cambios cada día es encontrar facilmente los posibles problemas (porque se ha cambiado poco código) (fallos descubiertos cerca del punto donde se desarrollaron).
Podemos desplegar más frecuentemente, obteniendo más feedback.

Fases: compilar, testear, avisar de los problemas
Ejemplo:
  -chequear cada minuto cambios en el repo (google code por ejemplo)
  -si los hay, bajarse el nuevo código
  -construir el programa
  -ejecutar tests, buscar bugs, etc
  -enviar emails con los problemas encontrados

https://wiki.jenkins-ci.org/display/JENKINS/Meet+Jenkins

Hudson lo empezó a desarrollar Sun, cuando lo compró Oracle, se hizo el fork jenkins.
Está escrito en java


Tasks:
Si ponemos una serie de comandos y uno falla se parará la ejecucción ahí.

Copiar, si queremos copiar una damos a crear una nueva y nos dará la opción al final de la pantalla.

Se puede hacer que todos los ficheros que se generen se almacenen en el "Espacio de trabajo" y los podemos obtener direcmtante.
También podemos usar "Acciones para ejecutar después" -> "Guardar ficheros generados"
Esto lo único que hace es darnos un acceso más directo al fichero.


Ejecutar periódicamente
H * * * * ;cada hora
* * * * * ; cada minuto
Mirar la ayuda para el formato.


# Groovy
Se puede inyectar código groovy y ejecutarlo
Esto nos da más potencia, por ejemplo hay un "jenkins" para acceder a toda la info
https://wiki.jenkins-ci.org/display/JENKINS/Jenkins+Script+Console

También tiene una consola para jugar: JENKINS_URL/scripts




# Api
https://wiki.jenkins-ci.org/display/JENKINS/Remote+access+API

Hacer un build de un job:
curl -i -X POST  http://jenkins.example.com/job/Blank_Job/buildWithParameters --user $username:$password

Con parámetros
buildWithParameters?token=testing&SERVICE_STATE=CRITICAL&SERVER=mongo

En la cabecera "Location" tenemos el id por el que preguntar luego
curl -X POST http://jenkins.example.com/queue/item/336/api/json --user $username:$password

Obtener nombres de jobs bajando tres niveles
https://www.cloudbees.com/blog/taming-jenkins-json-api-depth-and-tree
http://jenkins.inet/job/icinga/api/json/?pretty=true&depth=7&tree=jobs[name,jobs[name,jobs[name]]]



## Python
http://pythonhosted.org/jenkinsapi/
https://git.openstack.org/cgit/openstack/python-jenkins
  pip install jenkinsapi
  from jenkinsapi.jenkins import Jenkins
  server = Jenkins(jenkins_url, username = 'foouser', password = 'foopassword')

  Me gusta menos, parece que te pasa todas las tareas por su nombre, sin poder distinguir por directorio


https://python-jenkins.readthedocs.io/en/latest/
  pip install python-jenkins
  import jenkins
  server = jenkins.Jenkins('http://localhost:8080', username='myuser', password='mypassword o token')
  [j["name"] for j in server.get_job_info("monit/tests")['jobs']] # listado de jobs debajo de un dir

  Lanzar job:
  server.build_job('icinga/tools/default/cpu',{'SERVER': 'localhost'})

  Copiar una job: server.create_job("dir2/cpu", server.get_job_config("dir/cpu"))
  copy_job solo funciona dentro del mismo dir


## Ejecucciones remotas
Es posible llamar jobs remotamente, es una conf del job. Esta en "Disparadores de ejecucciones", "Lanzar ejecuciones remotas"


# Badge
Iconito para poner en nuestro repo para ver como va los checks, despliege, etc

protected exposes the badge to users having at least Read permission on the job
unprotected exposes the badge to users having at least ViewStatus permission on the job

# GitHub Hooks
Configurar el origen del código fuente -> Git
Disparadores de ejecuciones -> Build when a change is pushed to GitHub

Cuando se recibe un hook del repo configurado, se hace el build.

En el repo debemos configurar el hook como:
Service -> Add Jenkins (GitHub plugin)
Y meter la url del jenkins como: http://ci.jenkins-ci.org/github-webhook/

Entrar de nuevo en la conf del job de jenkins.
Si vemos un mensaje tipo "Hook for repo orga/repo on github.com failed to be registered or were removed. More info can be found on global manage page. This message will be dismissed if Jenkins receives a PING event from repo or repo will be ignored in global configuration."
Hacer una prueba del hook desde la web de github (pulsando en el hook recién configurado, "Test Service")

Parece que ese error puede aparecer aunque esté funcionando correctamente.

Si mandamos un "Test Service" y Jenkins detecta que ya ha hecho build de ese commit, no hará nada.
Lo podemos ver en "Last GitHub Push"



# Post Build Tasks
https://wiki.jenkins-ci.org/display/JENKINS/Post+build+task

Parece que no coge las ssh keys pasadas a las tasks normales.

No veo forma de en este paso cambiar el status del build.

http://stackoverflow.com/questions/8148122/how-to-mark-a-build-unstable-in-jenkins-when-running-shell-scripts
http://www.tikalk.com/devops/JenkinsJobStatusChange/




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


# DSL
Escribir scripts para, por ejemplo, crear a partir de un job, una serie de jobs con unas configuraciones específicas.
La documentación está en: http://JENKINS_SERVER/plugin/job-dsl/api-viewer/index.html
https://github.com/jenkinsci/job-dsl-plugin/wiki

Podemos obtener un poco de pistas creando una con la interfaz web y luego viendo su definición en XML:
http://JENKINS_SERVER/job/NOMBRE/config.xml

Crear directorio
folder(folderName) {
  displayName("path1/path2")
}

Definir un array e iterar por él:
def environments = ['int', 'pre', 'pro'] as String[]
environments.eachWithIndex{ environment, idx ->
  ...
}

Crear un job tipo freesyle:
freeStyleJob( serviceName +'/'+ phase + '_' + environment ) { ... }




A veces tenemos que formar una string para pasarla como parámetro. Si se queja haciendo esto:
projects("${serviceName}/${phase}_int")

Probar con:
def nextBuild = "${serviceName}/${phase}_int" as String
projects(nextBuild)



Si es obligatorio definir un parámetro pero no queremos darle valor
block null

Si tuviesemos que darle valor sería:
block {
  buildStepFailureThreshold("...")
  ...
}


# Errores
Problemas con ansible:
'ascii' codec can't encode character u'\xf3' in position 122: ordinal not in range(128)
Solo sale si lo ejecutamos con jenkins, ejecutándolo manualmente no da problemas
Lanzar ansible con:
PYTHONIOENCODING=UTF-8


# Acceder a ultimas ejecuciones sin poner el numero del build
https://wiki.jenkins-ci.org/display/JENKINS/Terminology
lastBuild, lastStableBuild, lastSuccessfulBuild, lastFailedBuild, lastUnstableBuild, lastUnsuccessfulBuild, lastCompletedBuild
