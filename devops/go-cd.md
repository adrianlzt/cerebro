http://www.go.cd/
Free, open source

Herramienta de continuous delivery desarrollada por thoughtworks
Permite separar entre pipes y elementos generados.

Go vs Jenkins:
http://highops.com/insights/continuous-delivery-pipelines-gocd-vs-jenkins/


A la pipeline le asociamos un template, y lo unimos a un repo.
Cada pipeline se contiene de stages, ejemplo: test, package, upload_ẗo_artifacts
  Se pueden casar para que no se ejecute un stage hasta que no se ejecute uno anterior.
Cada stage es un conjunto de jobs y cada job una serie de task (las tasks de un job se ejecutan siempre en el mismo agente):
Ejemplo con un job por stage:
  test -> unitest
  package -> bdist_rpm
  upload_to_artifacts -> upload_rpm

Ejemplo: creamos un template que haga compilación, testeo, generacion rpm y subir a un repo.
Ahora vamos creando distintas pipelines, y a cada pipelinele asignamos este template.
De esta manera solo tenemos que definir una vez las tareas a realizar, y luego crear pipelines es inmediato. Solo diremos nombre, que repo y ya lo tendremos hecho.
En Jenkins, por cada nuevo repo tendríamos que volver a definir las tareas a ejecutar.

Go permite definir varios entornos.


Go permite paralelización, un agente puede estar ejecutando un job de una pipeline, mientras otro agente ejecuta otra job de otra pipeline.
Un agente no tiene porque ejecutar todos los jobs de una pipeline.

Idea buena, separar en varios jobs los test, así varios agente en paralelo pueden ejecutar las pruebas. (válido por ejemplo también para generar rpms, deb, egg, etc)

Los agentes corren en:
/var/lib/go-agent/


Cada pipe debe estar dentro de un Environment para funcionar.
Cada environment tiene asignados unos workers.
Cada worker puede tener una serie de features (por ejemplo, la version de
centos que tiene)


Como cada agente puede ejecutar diferentes jobs, cuando comience una tarea, el agente deberá bajarse los materiales (git).
Go tiene una feature built-in para publicar rpms en el path que le digamos.
En la siguiente stage (upload-artifacts), podemos decir, coge los materiales publicados por la etapa anterior, y luego subirlos al repo que queramos, aunque por lo que he probado, tienes que especificar el nombre exacto, cosa que es dificil si estas generando un rpm y no sabes a priori cual es la version.
Para estos casos yo he hecho un script que ya se encarga de coger el ultimo rpm generado subirlo a donde toque.
En ese upload no ejecutamos el createrepo, para esto llamamos a una pipeline al terminar.
Esta nueva pipeline tiene un lock integrado para encolar llamadas a createrepo, para no tener problemas.
Al comando createrepo le podemos pasar parámetros (la variable del entorno en el que estemos: dev, int, pre, pro...)
Esta pipeline es ejecutada por todas las stages de upload_rpm, y esta pipeline se encarga de actualizar los rpm.
Esa misma pipeline podría ejecutar tests, smoke-tests, puppet apply, etc.

Estos rpms generados irían pasando por distintos entornos, y si van siendo validados, pasan al siguiente entorno.
Esto puede ser automático, o manual (por ejemplo para el paso a producción), donde nos pondrá un botón de "play" para que lo ejecutemos.



Al crear un job podemos decir que recursos necesita, por ejemplo, windows.
Los agentes también tienen asignados recursos, windows por ejemplo. Así una tarea para windows solo la ejecutaría un agente windows.



Un template está asignado a muchas jobs. Si modificamos el template, se modifican todas las jobs.
Ejemplo, un template sería generar un testear/generar/uplodear un código como un rpm de un check nagios.


Cuando hagamos un push a un repo, este estará asociado a una pipe en concreto, esta se ejecutará, y subirá el rpm.



# configuracion
/etc/go/cruise-config.xml
Aqui estarán configurados los usuarios y que rol.
No hace falta reiniciar el servicio para que se apliquen los cambios.

Ejemplo:
  <server artifactsdir="artifacts" purgeStart="1.0" purgeUpto="3.0" commandRepositoryLocation="default" serverId="xxxxxxxxxxxx">
    <security>
      <ldap uri=" ldap://server.ldap" searchFilter="(uid={0})">
        <bases>
          <base value="o=NOMBRE" />
        </bases>
      </ldap>
      <roles>
        <role name="user" />
        <role name="dev">
          <users>
            <user>DDD</user>
          </users>
        </role>
        <role name="guest">
          <users>
            <user>CCC</user>
        </role>
        <role name="admin">
          <users>
            <user>BBBB</user>
          </users>
        </role>
      </roles>
      <admins>
        <user>AAA</user>
      </admins>
    </security>
    <mailhost hostname="servidor.de.mail.com" port="25" tls="false" from="go@ci-server.com" admin="admin@admin.es" />
  </server>


# Añadir un proyecto al cruise-config.xml
go-ci_add_project.md NOMBRE


# Añadir un agente
Instalar:
java-1.8.0-openjdk
go-agent

Configurar:
/etc/default/go-agent



# API

## Pipeline
Ejecutar una pipeline
https://api.go.cd/current/#scheduling-pipelines
curl 'http://ci.example.com/go/api/pipelines/pipeline1/schedule' -u 'username:password' -H 'Confirm: true' -X POST

Mostrar nombres de las pipelines del primer grupo:
curl 'http://ci.example.com/go/api/config/pipeline_groups' | jq -r '.[0].pipelines[].name'



# Ejecutando comandos
El workdir es: /var/lib/go-agent/pipelines/NOMBREPIPELINE
En ese workdir tendremos los ficheros del repo.
El usuario es go
Los parametros, meter uno por cada línea.

Lo mejor es poner esta extension: https://github.com/gocd-contrib/script-executor-task
Nos deja escribir directamente scripts de shell


GO_FROM_REVISION primer commit de git que se va a aplicar
GO_TO_REVISION ultimo commit
