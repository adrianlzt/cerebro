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

Tambien podemos poner en el commit:
```
[skip ci]
```
Eso creará la pipeline, pero la skipeará.
Parece que eso va antes del chequeo de workflow.

Expresión regular para hacer match del "skip ci":
https://gitlab.com/gitlab-org/gitlab/-/blob/master/lib/gitlab/ci/pipeline/chain/skip.rb#L10

## MR
Para las MR podemos usar labels, que tendremos disponible en una variable, ejemplo:
CI_MERGE_REQUEST_LABELS=foo-bar,skip-ansible-lint


# Runners
## podman
https://docs.gitlab.com/runner/executors/docker.html#use-podman-to-run-docker-commands

Parece que con hacer
systemctl enable --now podman.socket

Y montarle al contenedor docker de gitlab /run/podman/podman.sock como /var/run/docker.sock ya funciona.

# Debug
Podemos entrar en la shell de un runner mientras está ejecutando una tarea
https://docs.gitlab.com/ee/ci/interactive_web_terminal/

Pero no para los shared runners. Issue: https://gitlab.com/gitlab-org/gitlab/-/issues/24674

Podemos hacer un docker exec en la máquina donde esté el runner.

Si queremos tener las variables de entorno tipo fichero bien configuradas:
cd /builds/ORG/PROJECT.tmp/
for i in $(ls); do export $i=$PWD/$i; done


## runner local
https://www.lullabot.com/articles/debugging-jobs-gitlab-ci
https://campfirecode.medium.com/debugging-gitlab-ci-pipelines-locally-e2699608f4df

DEPRECATED: https://gitlab.com/gitlab-org/gitlab-runner/-/issues/2797
Algunas cosas no funcionan, como los yaml anchors
https://gitlab.com/gitlab-org/gitlab-runner/-/issues/26413
Mirar gitlab-ci-local

Vamos al directorio donde tenemos el .gitlab-ci.yml
cd miproyecto/
gitlab-runner exec docker --docker-image IMAGEN/DE/DOCKER NOMBREJOB

### gitlab-ci-local
Parece que hay una alternativa no oficial:
https://github.com/firecow/gitlab-ci-local
AUR/gitlab-ci-local

cd proyecto/
gitlab-ci-local --list-all

Tenemos que explicitar en el job la "image" de docker a usar. Si no, correrá en local.

Para pasar variables, crear el fichero .gitlab-ci-local-variables.yml y ponerlas con el siguiente formato:

```
SOME_ENV_VAR: mipassword

TF_VAR_foobar:
  type: file
  values:
    '*': |
      contenido del fichero
      que puede ser multilinea
```



# Cache / artifacts
https://about.gitlab.com/blog/2022/09/12/a-visual-guide-to-gitlab-ci-caching/

If your job does not rely on the the previous one (i.e. can produce it by itself but if content already exists the job will run faster), then use cache.
If your job does rely on the output of the previous one (i.e. cannot produce it by itself), then use artifacts and dependencies.

## Cache
Si un job falla, lo que pudiese haber guardado en los directorios de cache no se persiste.
