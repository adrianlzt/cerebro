Operador para hacer gitops en Kubernetes.

# Install CLI
La herramienta para usar flux es fluxctl.
En arch tenemos un AUR: fluxctl-bin


# Install flux
Se creará un "deployment" en un namespace (típicamente "flux") donde correrá el dominio flux.
Al desplegarlo le especificamos un repo, para que?

fluxctl install --git-url 'git@git.usync.us:adrian/flux-get-started.git' --git-email adrian@usync.com --git-path=namespaces,workloads  | kc apply -f -

