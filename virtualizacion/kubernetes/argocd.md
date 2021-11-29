https://argo-cd.readthedocs.io/en/stable/

Argo CD is a declarative, GitOps continuous delivery tool for Kubernetes.

# Uso
Definimos repos en la UI de ArgoCD

Luego creamos un project, donde seleccionaremos un repositorio y un destination (cluster de k8s y namespace).
Podemos usar las "labels" para seleccionar solo ciertos recursos.
Por ejemplo, podemos tener una label "environment" y decirle a argo que solo despliegue en este proyecto los recursos de la label "environment=dev".

