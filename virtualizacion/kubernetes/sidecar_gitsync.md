https://github.com/kubernetes/git-sync

Un sidecar que se encarga de mantener un repo de git actualizado.


Ejemplo usando un sidecar para generar html con hugo a partir de un repo de markdown
https://github.com/kubernetes/git-sync/tree/master/demo/config


k8s.gcr.io/git-sync/git-sync
mirar la última versión en https://github.com/kubernetes/git-sync/releases

Los parámetros se pueden poner como variables de entorno o parámetros

Ejemplos de variables de entorno:
- name: GIT_SYNC_ONE_TIME
  value: "true"
- name: GIT_SYNC_BRANCH
  value: main
- name: GIT_SYNC_REPO
  value: https://git.com/tools/docs.git
- name: GIT_SYNC_ROOT
  value: /tmp/git
- name: GIT_SYNC_EXECHOOK_COMMAND
  value: "/tmp/script/rsync.sh"
- name: GIT_SYNC_USERNAME
  value: "foo"
- name: GIT_SYNC_PASSWORD
  value: "foo"
