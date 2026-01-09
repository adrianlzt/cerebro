# Quadlets

<https://docs.podman.io/en/latest/markdown/podman-quadlet.1.html>

Es la nueva forma de gestionar contendores con systemd.

Se definen los contendores direcatamente como una unit de systemd.

# Ejecutar comando en un pod usando systemd

```bash
systemd-run --scope --user podman container exec -it quizzical_newton bash
```

# Systemd

Si queremos generar una unit para un pod

```bash
podman generate systemd --name nombrePod > mi.unit
# --name es para usar el nombre de pod en vez del id
```

# Ejecutar contenedor que tiene systemd

```bash
podman run --rm -it docker.io/almalinux/9-init:9.0-20221001
```

Visto por ahí, pero al probar a quitar flags vi que no eran necesarias:

```bash
podman run --rm -it --tmpfs /run --tmpfs /tmp -v /sys/fs/cgroup:/sys/fs/cgroup:ro --cap-add SYS_ADMIN docker.io/almalinux/9-init:9.0-20221001
```
