https://containerd.io/

Container runtime que gestiona todo el ciclo de vida: imágenes, ejecucción, supervisión, low-level storage, network, etc
Usar runC para correr los containers


# CLI
sudo ctr --address unix:///var/run/docker/libcontainerd/docker-containerd.sock containers



# Containerd 1.0
https://blog.mobyproject.org/containerd-namespaces-for-docker-kubernetes-and-beyond-d6c43f565084

## Namespaces
Los namespaces tienen recursos independientes de otros namespaces: image, container, task, snapshot
