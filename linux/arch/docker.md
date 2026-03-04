Arrancar pod con arch con systemd:

```bash
podman run -it --rm --privileged --volume /sys/fs/cgroup:/sys/fs/cgroup:ro docker.io/archlinux/archlinux /usr/sbin/init
```

No hay usuario con password por defecto.
Entrar con "podman run ..."

Si queremos usar "yay" necesitamos tener systemd corriendo y también tener git instalado.
