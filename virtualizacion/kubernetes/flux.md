Operador para hacer gitops en Kubernetes.

# Install CLI
La herramienta para usar flux es fluxctl.
En arch tenemos un AUR: fluxctl-bin


# Install flux
Se creará un "deployment" en un namespace (típicamente "flux") donde correrá el dominio flux.

Si estamos usando un repo privado, seguir estas instrucciones para permitir el clonado:
https://docs.fluxcd.io/en/latest/guides/use-private-git-host.html
Tendremos que meter la ssh key del repo en los known_hosts de ssh del pod flux user root
En el yaml que genera fluxctl install, tendremos que añadir el ConfigMap con los known_hosts de nuestro server y descomentar el volume "ssh-config" y el volume del mismo nombre.

fluxctl install --git-url 'git@git.usync.us:adrian/flux-get-started.git' --git-email adrian@email.com --git-path=namespaces,workloads  | kc apply -f -

Si tenemos ssh en otro puerto:
--git-url 'ssh://git@git.dominio.com:2222/adrian/flux-get-started.git'

Crea:
  serviceaccount/flux
  clusterrole.rbac.authorization.k8s.io/flux
  clusterrolebinding.rbac.authorization.k8s.io/flux
  deployment.apps/flux
  secret/flux-git-deploy
  deployment.apps/memcached
  service/memcached


Una vez arrancado (veremos un container flux y otro memcached), le pediremos la clave ssh generada para meterla en nuestro server Git, para que pueda hacer pull/push
fluxctl identity --k8s-fwd-ns flux

Si nos da un error:
Error: git repository xxx  is not ready to sync (status: new)
Buscar en los logs, por que seguramente no está pudiendo clonar el repo.
kc logs -l name=flux | grep "git repo"

Para ver que está pasando con el repo me ha sido útil mirar los logs quitando los errores de sincronización de imágenes:
kc logs -f flux-56d579f875-t5z58 | grep -v -e images.go -e warming.go -e repocachemanager.go


# Uso
Si queremos forzar un refresh del repo y despliegue:
fluxctl --k8s-fwd-ns flux sync
