https://containerd.io/

Container runtime que gestiona todo el ciclo de vida: imágenes, ejecucción, supervisión, low-level storage, network, etc
Usar runC para correr los containers


Parece que otra cli que se usa para manejar containerd es (visto en una instalación de k8s con kubespray):
nerdctl
Compatible con docker

La cli oficil de containerd es crictl


# CLI
sudo ctr --address unix:///var/run/docker/libcontainerd/docker-containerd.sock containers

ctr containers ls
ctr c ls

ctr images ls
ctr i ls

Tenemos "namespaces", por defecto se ataca al "default".

Para ver los que tenemos:
ctr namespaces ls

Para obtener los containers de un namespace determinado:
ctr -n k8s.io c ls


Docker usa el namespace "moby"


Pull imagen de un repo local http:
ctr -n k8s.io i pull 172.30.0.1:32768/resolver:scratch  --plain-http -k

Ejecutar un container
ctr -n k8s.io run --rm -t IMAGEN NOMBRE CMD



# Containerd 1.0
https://blog.mobyproject.org/containerd-namespaces-for-docker-kubernetes-and-beyond-d6c43f565084

## Namespaces
Los namespaces tienen recursos independientes de otros namespaces: image, container, task, snapshot
