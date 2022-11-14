# Pod
Tenemos también el concepto de pods
Cremos un pod (que crea un container de "infra")
Luego podemo ir metiendo containers en el pod.

TERMINAR ESTAS NOTAS

podman pod ps
  mostrar pods

Creamos un pod y le vamos agregando containers (podman run):
podman pod create --name mypod
  los "--publish/-p" deberemos hacerlos aqui
podman run --pod NOMBRE ...
