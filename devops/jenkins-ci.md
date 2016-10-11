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


