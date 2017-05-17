# Authorization policies
https://docs.openshift.com/enterprise/3.0/architecture/additional_concepts/authorization.html#architecture-additional-concepts-authorization-overview

Ver como estoy logueando con la herramienta "oc":
oc whoami

Que puede hacer un usuario en un proyecto.
Rules: lo que se permite hacer
Roles: colecciones de rules
Bindings: uniones de usuarios y/o grupos a roles

oc get rolebindings
oc get clusterroles
oc get roles
oc get clusterpolicy
oc get clusterrolebindings
oc get policy


# SCC / Security Context Constraints
https://docs.openshift.com/enterprise/3.0/admin_guide/manage_scc.html
https://docs.openshift.com/enterprise/3.0/architecture/additional_concepts/authorization.html#security-context-constraints

Por defecto no está permitido correr containers como root.
Esto es una medida de seguridad por si la app consiguese escapar de los NameSpaces donde está retenida, no sea root en el docker host.


Listar SCCs
oc get scc

Mostrar info detallada sobre un scc
oc describe scc anyuid


Agregar al usuario que corre los containers por defecto en nuestro projecto (el que tengamos configurado actualmente) 
oc adm policy add-scc-to-user anyuid -z default
  CUIDADO! estamos permitiendo a un container correr como root.
