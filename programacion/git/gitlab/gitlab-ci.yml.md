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
