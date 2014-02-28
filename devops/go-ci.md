http://www.go.cd/
Free, open source

Herramienta de continuous delivery desarrollada por thoughtworks


Permite separar entre pipes y elementos generados.


A la pipeline le asociamos un template, y lo unimos a un repo.
Cada pipeline se contiene de stages, ejemplo: test, package, upload_ẗo_artifacts
  Se pueden casar para que no se ejecute un stage hasta que no se ejecute uno anterior.
Cada stage es un conjunto de jobs y cada job una serie de task (las tasks de un job se ejecutan siempre en el mismo agente):
Ejemplo con un job por stage:
  test -> unitest
  package -> bdist_rpm
  upload_to_artifacts -> upload_rpm

Go permite definir varios entornos.


Go permite paralelización, un agente puede estar ejecutando un job de una pipeline, mientras otro agente ejecuta otra job de otra pipeline.
Un agente no tiene porque ejecutar todos los jobs de una pipeline.

Idea buena, separar en varios jobs los test, así varios agente en paralelo pueden ejecutar las pruebas. (válido por ejemplo también para generar rpms, deb, egg, etc)

Los agentes corren en:
/var/lib/go/agent/1



Como cada agente puede ejecutar diferentes jobs, cuando comience una tarea, el agente deberá bajarse los materiales (git).
Go tiene una feature built-in para publicar rpms en el path que le digamos.
En la siguiente stage (upload-artifacts), podemos decir, coge los materiales publicados por la etapa anterior, y luego subirlos al repo que queramos.
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
