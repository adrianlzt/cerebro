# .gitlab-ci.yml
https://docs.gitlab.com/ee/ci/yaml/

Colección de contenedores para automatizar tareas de linting, etc
https://gitlab.com/pipeline-components


## workflow
Suelen ser unos condicionales que deciden de forma global si se va a ejecutar la pipeline.
Típicamente chequeamos si estamos en una tag, mr, branch, etc.

Hay unos templates para los casos típicos:
https://docs.gitlab.com/ee/ci/yaml/workflow.html#workflowrules-templates

## includes
Importar otros ficheros de pipelines.

Podemos también usar condicionales para decidir si importarlos
https://docs.gitlab.com/ee/ci/yaml/includes.html#use-rules-with-include
https://docs.gitlab.com/ee/ci/yaml/workflow.html

Parece que para hacer include de otros ficheros tengo que usar template y que el fichero termine en .gitlab-ci.yml
Al menos eso me pasa al modificar el Auto-DevOps.gitlab-ci.yml


BUG! https://gitlab.com/gitlab-org/gitlab/-/issues/370005
No podemos usar "exists" en un proyecto que importamos en una pipeline.
Esta feature es muy interesante para poder tener una serie de jobs generales y aplicarlas según existan ciertos ficheros. Esas jobs solo se incluirán si hace match de tal fichero.
Workaround, poner las rules sobre las jobs en vez de el include.

Lo que si se puede (todo local)
https://gitlab.com/gitlab-de/playground/conditional-includes-with-exists/-/blob/main/.gitlab-ci.yml



# rules / condicionales
https://docs.gitlab.com/ee/ci/yaml/#rules
De forma general, si tenemos varias reglas, si una hace match, se ejecuta el job.

Podemos usar "when: never" para que si hace match no se ejecute.
  rules:
    - if: $CONTAINER_SCANNING_DISABLED
      when: never
    - if: $CI_MERGE_REQUEST_IID && $GITLAB_FEATURES =~ /\bcontainer_scanning\b/
    - if: $CI_COMMIT_TAG && $GITLAB_FEATURES =~ /\bcontainer_scanning\b/
    - if: $CI_COMMIT_BRANCH && $CI_COMMIT_REF_PROTECTED == 'true' && $GITLAB_FEATURES =~ /\bcontainer_scanning\b/

Poner "and" en un condicional "if"
    - if: $CI_MERGE_REQUEST_LABELS =~ 'skip-ansible-lint' && $CI_PIPELINE_SOURCE == 'merge_request_event'

Ejecutar si no es una MR y si el commit no empieza por "Merge branch"
    - if: $CI_PIPELINE_SOURCE == 'merge_request_event'
      when: never
    - if: '$CI_COMMIT_TITLE =~ /^Merge branch/'
      when: never
    - when: always


# allow-failure
https://docs.gitlab.com/ee/ci/yaml/#allow_failure

Por defecto, si un job falla en una pipeline, esta se para.

Podemos usar:
```
allow_failure: true
```

Para permitir que continuen las tareas.
Si la tarea con ese tag falla, se pondrá en naranja.

Mezclar "if" con "exists" (que exista un fichero en el repo)
    - if: $CI_MERGE_REQUEST_LABELS =~ 'skip-ansible-lint' && $CI_PIPELINE_SOURCE == 'merge_request_event'
      exists:
        - meta/main.yml


Comprobar si es una MR
    - if: $CI_PIPELINE_SOURCE == 'merge_request_event'


# scripts
Por defecto tiene configurado:
set -eo pipefail

Esto hace que si un comando en una pipe de bash falla, todo el job falle en ese punto.

Parece que no se puede desactivar.
https://forum.gitlab.com/t/does-the-ci-runner-have-something-against-pipes-gitlab-com/29434/5
