GitOps en Kubernetes
Container que escucha cambios en el registry de docker y en un repo aplicando los cambios sobre kubernetes.

El típico caso de uso será tener arrancado un flux en el mismo namespace que nuestra aplicación apuntando al repo git donde tengamos los yaml con el despliegue.
Cada 5' flux buscará cambios en ese repo y los aplicará sobre los recursos desplegados en k8s.
Este es el funcionamiento por defecto.

Parece que si tenemos nuevos .yaml, despliega un nuevo pod (mismo deployment)

También podemos configurarlo para buscar nuevas imágenes de los pods desplegados relacionados con nuestro repo de git y cuando haya una imagen nueva, modificar el yaml que corresponda y actualizar el despliegue.
Que imagen más nueva se basará en la fecha, no en el version. Podemos ver con "list-images" cual considera que es más nueva (arriba más nuevas)

Deberemos tener un flux por repositorio.

Podemos usar un operator que nos simplificará crear estos pods flux.
Si no, usaremos la herramienta "fluxctl install" para generar un yaml para desplegarlo.


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
  se usará el namespace donde estemos actualmente para generar el fichero .yaml

Si tenemos ssh en otro puerto:
--git-url 'ssh://git@git.dominio.com:2222/adrian/flux-get-started.git'

Para evitar escaneos de repos que seguramente no queremos auto actualizar:
--registry-exclude-image=docker.elastic.co/*,index.docker.io/*,registry.gitlab.com/*,gcr.io/*,docker.io/*,k8s.gcr.io/*,quay.io/*
https://github.com/fluxcd/flux/issues/2864
Esto no ignorará las imágenes sin prefijo, por ejemplo "alpine", al no tener el prefijo index.docker.io/


Crea:
  serviceaccount/flux
  clusterrole.rbac.authorization.k8s.io/flux
  clusterrolebinding.rbac.authorization.k8s.io/flux
  deployment.apps/flux
  secret/flux-git-deploy
  deployment.apps/memcached
  service/memcached

Tras desplegar, comprobar el log del pod flux en busca de errores.


Una vez arrancado (veremos un container flux y otro memcached, para cachear metadata de las imágenes), le pediremos la clave ssh generada para meterla en nuestro server Git, para que pueda hacer pull/push
fluxctl identity --k8s-fwd-ns flux

También podemos cambiarla: https://docs.fluxcd.io/en/latest/faq.html#how-do-i-use-my-own-deploy-key


Si nos da un error:
Error: git repository xxx  is not ready to sync (status: new)
Buscar en los logs, por que seguramente no está pudiendo clonar el repo.
kc logs -l name=flux | grep "git repo"

Para ver que está pasando con el repo me ha sido útil mirar los logs quitando los errores de sincronización de imágenes:
kc logs -f flux-56d579f875-t5z58 | grep -v -e images.go -e warming.go -e repocachemanager.go

Podemos lanzar list-images para ver si recupera correctamente la info de las imágenes.



# Uso
Si queremos forzar un refresh del repo y despliegue:
fluxctl --k8s-fwd-ns flux sync

Si queremos ver que workloads ("pods" corriendo) conoce flux:
fluxctl --k8s-fwd-ns flux list-workloads

Si queremos ver que imágenes conoce flux:
fluxctl --k8s-fwd-ns flux list-images
  aquí podremos ver, por ejemplo, si un workload tiene disponible una imagen nueva pero no la está usando
  las imágenes se ordenan de más nuevas (arriba) a más antiguas (abajo)

Si queremos solo ver las imágenes para un determinado workload:
fluxctl list-images -w demo:deployment/podinfo




# Config
Todos los cambios que hagamos con fluxctl en realidad lo que harán es un commit en el repo. Y luego el pod verá los cambios y ejecutará modificaciones si es necesario.

## Actualización automática ante nuevas imágenes
Una opción es hacerlo con fluxctl (que modificará el repo para meter esa annotation):
fluxctl --k8s-fwd-ns nuestroNS automate -w nuestroNS:deployment/nombreDeployment

Otra opción es meter una annotation en el yaml:
metadata:
  annotations:
    fluxcd.io/automated: 'true'



Podemos también seleccionar que imágenes se usarán, por ejemplo si solo queremos 1.x.x:
https://docs.fluxcd.io/en/latest/tutorials/driving-flux.html?highlight=tag.init#driving-flux

Ejemplo, actualizar siempre que sea una imagen 1.4.*
fluxctl policy -w demo:deployment/podinfo --tag-all='1.4.*'

La diferencia entre --tag y --tag-all es que este último aplica a todas las imágenes del pod (para casos de pods con multiples containers).

Para ver los distintos tipos de filtrado que podemos usar para seleccionar imágenes:
https://docs.fluxcd.io/en/1.18.0/references/fluxctl.html#image-tag-filtering

Ejemplo para que solo actualice a tags tipo A.B.C (en la doc dice que "--tag-all='semver:*'" hace eso, pero en una prueba que hice me pillo una tag tipo NNN):
--tag-all='regexp:^([0-9]+\.[0-9]+\.[0-9]+)' --automate



## Borrado
Podemos hacer que flux borre objetos cuando los deje de detectar
https://docs.fluxcd.io/en/1.18.0/faq.html#will-flux-delete-resources-when-i-remove-them-from-git
Tendremos que pasar el parámetro --sync-garbage-collection al fluxd.
