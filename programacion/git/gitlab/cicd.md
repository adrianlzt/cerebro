https://docs.gitlab.com/ee/ci/quick_start/

Examples:
https://docs.gitlab.com/ee/ci/examples/
https://gitlab.com/gitlab-org/gitlab/-/tree/master/lib/gitlab/ci/templates

# Auto DevOps
Si activamos AutoDevOps, a todos los proyectos se le aplica este .gitlab-ci.yml (en caso de no tener uno custom).
https://gitlab.com/gitlab-org/gitlab/-/blob/master/lib/gitlab/ci/templates/Auto-DevOps.gitlab-ci.yml

El código ruby donde se hace un include template de ese fichero (podemos modificarlo si queremos que haga otra cosa):
gitlab/ci/project_config/auto_devops.rb
Lo que hace es simular que tenemos un fichero .gitlab-ci.yml con el contenido:
```
include:
  template: Auto-DevOps.gitlab-ci.yml
```
El problema es de esto es que usar "template" quita mucha funcionalidad.
No podemos usar includes de proyectos (tiene que tirar de un proyecto abierto o una URL pública).


Este fichero chequea si existen ciertos ficheros y entonces considera que hace "match" y se ejecuta.

Parece que no nos dejan modificar el fichero de forma global (https://gitlab.com/gitlab-org/gitlab/-/issues/20169)
En el despliegue con docker está en:
/opt/gitlab/embedded/service/gitlab-rails/lib/gitlab/ci/templates/Auto-DevOps.gitlab-ci.yml

Podemos modificarlo para setear nuestros propios valores.

Una idea es poner en ese fichero únicamente un include y así gestionamos todo nuestro auto devops custom en un repo.
EL PROBLEMA es que este repo tiene que ser público.
include:
  - project: 'cicd/auto-devops'
    file: 'main.yml'

Otra opción es exponer un repo nuestro internamente (usando un contenedor git-sync + python http.server) y apuntar con un include external a esa url http.
Tendremos que permitir en gitlab el acceso a las ips internas (settings - network - Outbound requests - Local IP addresses and domain names that hooks and services may access)


# Skip pipeline
https://docs.gitlab.com/ee/ci/pipelines/#skip-a-pipeline
git push -o ci.skip

No vale para pipelines de merge request

## MR
Para las MR podemos usar labels, que tendremos disponible en una variable, ejemplo:
CI_MERGE_REQUEST_LABELS=foo-bar,skip-ansible-lint


# Debug
Podemos entrar en la shell de un runner mientras está ejecutando una tarea
https://docs.gitlab.com/ee/ci/interactive_web_terminal/

Pero no para los shared runners. Issue: https://gitlab.com/gitlab-org/gitlab/-/issues/24674

Podemos hacer un docker exec en la máquina donde esté el runner.
