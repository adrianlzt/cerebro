https://kubernetes.io
Kubernetes is an open-source platform for automating deployment, scaling, and operations of application containers across clusters of hosts, providing container-centric infrastructure.


k8s es el diminutivo de kubernetes.

Es competencia de docker swarm.
Es un "scheduler" para correr "servicios" sobre un cluster de dockers.
Kubernetes orquesta cuantos containers deben ejecutarse para cada servicio y donde deben estar.
Limita el hardware para cada servicio/container, permite desplegar nuevas versiones, etc.


Nos da un montón de facilidades (https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/#why-do-i-need-kubernetes-and-what-can-it-do):
 - gestiionar storage
 - distribuir secretos
 - comprobar health de las apps
 - naming and discovery
 - rolling updates
 - logs
 - monitoring resources
 - etc



Que NO es (https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/#what-kubernetes-is-not)
 - una solución PaaS completa
 - no proporciona storage
 - no tiene un click-deloy
 - no está definido lo que se puede desplegar
 - etc




Podemos comenzar montando un kubernetes en una vm: minikube.md
