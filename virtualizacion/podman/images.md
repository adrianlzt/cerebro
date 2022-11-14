# Images
podman images
  listar imágenes

podman pull --tls-verify=false registr/imagen
  bajar sin verificar cert del registry

Recomiendan usar el FQDN de las imágenes, ej.: docker.io/jenkinsci/jenkins
Si queremos podemos poner unos unqualified-search-registries para que busque en esos.
Ejemplo: https://github.com/containers/podman/blob/master/test/registries.conf


