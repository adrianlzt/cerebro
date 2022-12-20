# Ejecutar comando en un pod usando systemd
systemd-run --scope --user podman container exec -it quizzical_newton bash


# Systemd
Si queremos generar una unit para un pod

podman generate systemd --name nombrePod > mi.unit
  --name es para usar el nombre de pod en vez del id


# Ejecutar contenedor que tiene systemd
podman run --rm -it docker.io/almalinux/9-init:9.0-20221001

Visto por ahí, pero al probar a quitar flags vi que no eran necesarias:
podman run --rm -it --tmpfs /run --tmpfs /tmp -v /sys/fs/cgroup:/sys/fs/cgroup:ro --cap-add SYS_ADMIN docker.io/almalinux/9-init:9.0-20221001
