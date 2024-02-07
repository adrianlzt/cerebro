https://codefresh.io/docs/docs/new-helm/helm-best-practices/#helm-vs-k8s-templates
Helm es una gestión completa, los otros "competidores" solo hacen templating.

Con helm podemos templatizar un fichero de configuración de manera sencilla.
No tengo claro que esto sea modificable en kustomize.
O tener muchos deployments y modificarlos según usemos, por ejemplo, una cloud u otra.
En kustomize esto require de múltiples patches.
