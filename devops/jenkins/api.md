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



# Python
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


# Ejecucciones remotas
Es posible llamar jobs remotamente, es una conf del job. Esta en "Disparadores de ejecucciones", "Lanzar ejecuciones remotas"
