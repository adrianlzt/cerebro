# Que un proyecto/namespace solo despliegue sobre un selector de nodo
https://docs.openshift.com/container-platform/3.5/admin_guide/managing_projects.html#setting-the-project-wide-node-selector

kind: Namespace
  metadata:
    annotations:
      openshift.io/node-selector: infra


Al crearlo:
oadm new-project myproject --node-selector='type=user-node,region=east'


Uno ya creado:
oc edit namespace newproject
  annotations:
      openshift.io/node-selector: “region=secondary"
