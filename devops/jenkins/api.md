https://wiki.jenkins-ci.org/display/JENKINS/Remote+access+API

La idea es que como usuario nos creemos un token (http://localhost:8080/me/configure) y lo usemos en vez de nuestra password (que de todas no funciona sin pedir un crumb)
https://medium.com/@rathourarvi/remote-access-to-your-jenkins-using-rest-api-3d0c0bdb48a



Hacer un build de un job:
curl -i -X POST  http://jenkins.example.com/job/Blank_Job/buildWithParameters --user $username:$password

Con parámetros
buildWithParameters?token=testing&SERVICE_STATE=CRITICAL&SERVER=mongo

Enviar parametros con POST:
curl -X POST JENKINS_URL/job/JOB_NAME/build \
  --user USER:TOKEN \
  --data-urlencode json='{"parameter": [{"name":"id", "value":"123"}, {"name":"verbosity", "value":"high"}]}'

En la cabecera "Location" tenemos el id por el que preguntar luego
curl -X POST http://jenkins.example.com/queue/item/336/api/json --user $username:$password
  una vez ejecutado podriamos obtener la URL que hay que consultar.

Obtener nombres de jobs bajando tres niveles
https://www.cloudbees.com/blog/taming-jenkins-json-api-depth-and-tree
http://jenkins.inet/job/icinga/api/json/?pretty=true&depth=7&tree=jobs[name,jobs[name,jobs[name]]]


# XML
Ejemplo usando la api de XML filtrando por un valor
https://jenkins.inet/job/dsmctools/job/icinga/job/dsmctools/job/default/job/check_cpu/job/check_pro/api/xml?depth=1&xpath=.//build[action/parameter[name='SERVER'][value='MS04P']]&wrapper=builds&pretty=true


# JSON
https://www.cloudbees.com/blog/taming-jenkins-json-api-depth-and-tree
https://gist.github.com/justlaputa/5634984


# Python
https://python-jenkins.readthedocs.io/en/latest/
  pip install python-jenkins
  import jenkins
  server = jenkins.Jenkins('http://localhost:8080', username='myuser', password='mypassword o token')
  [j["name"] for j in server.get_job_info("monit/tests")['jobs']] # listado de jobs debajo de un dir

  Lanzar job:
  server.build_job('icinga/tools/default/cpu',{'SERVER': 'localhost'})

  Copiar una job: server.create_job("dir2/cpu", server.get_job_config("dir/cpu"))
  copy_job solo funciona dentro del mismo dir


http://pythonhosted.org/jenkinsapi/
https://git.openstack.org/cgit/openstack/python-jenkins
  pip install jenkinsapi
  from jenkinsapi.jenkins import Jenkins
  server = Jenkins(jenkins_url, username = 'foouser', password = 'foopassword')

  Me gusta menos, parece que te pasa todas las tareas por su nombre, sin poder distinguir por directorio



# Ejecucciones remotas
Es posible llamar jobs remotamente, es una conf del job. Esta en "Disparadores de ejecucciones", "Lanzar ejecuciones remotas"



# Crear un job (solo XML)
Bajarnos un config.xml de una tarea ya existente
wget http://localhost:8080/job/nuevojob/config.xml

Modificar lo que necesitemos
Crear job haciendo un:
curl "http://localhost:8080/createItem?name=pruebaCurl" -H "Content-Type: application/xml" -d @config.xml

Tenemos que desactivar CSRF (no recomendado https://github.com/jenkinsci/configuration-as-code-plugin/issues/1184#issuecomment-589971864 https://twitter.com/danielbeck/status/1214346538618621964) o primero pedir un crumb:
curl -u admin:admin -s 'http://localhost:8080/crumbIssuer/api/xml?xpath=concat(//crumbRequestField,":",//crumb)'

CUIDADO! Parece que ya no funciona lo del crumb, usar user+token

https://stackoverflow.com/questions/38137760/jenkins-rest-api-create-job
http://www.inanzzz.com/index.php/post/jnrg/running-jenkins-build-via-command-line


# Ejecutar script de groovy
https://support.cloudbees.com/hc/en-us/articles/217509228-Execute-Groovy-script-in-Jenkins-remotely

curl -d "script=$(cat /tmp/system-message-example.groovy)" -v --user username:ApiToken https://jenkins.example.com/scriptText

Si estamos usando ansible, tenemos un job que gestiona todo: https://docs.ansible.com/ansible/latest/collections/community/general/jenkins_script_module.html

Si queremos sacar un valor usar "print", si no, nos pondrá "Result: valor"
print(jenkins.model.Jenkins.getInstance().getComputer("podman-runner0").getJnlpMac())



# Llamadas usando crumb
curl -u admin:admin 'localhost:8080/crumbIssuer/api/json' --cookie-jar cookies
  tenemos que quedarnos con el crumb y la cookie JSESSIONID, y usar ambas en la petición que queramos hacer a la api
curl -v -u admin:admin -H "Jenkins-Crumb:74857e42f033ac4ad5ec9fa3659a97f2f322de086c09cd4acd8ea59b96903c6a" localhost:8080/scriptText -d "script=jenkins.model.Jenkins.getInstance().getComputer(\"podman-runner0\").getJnlpMac()" --cookie cookies


Si estamos usando ansible, tenemos un job que gestiona todo: https://docs.ansible.com/ansible/latest/collections/community/general/jenkins_script_module.html
