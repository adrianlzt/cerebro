# Asociar un namespace a un nodo
kind: Namespace
  metadata:
    annotations:
      openshift.io/node-selector: infra
