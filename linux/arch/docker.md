Arrancar pod con arch con systemd:
podman run -it --rm --privileged --volume /sys/fs/cgroup:/sys/fs/cgroup:ro docker.io/archlinux/archlinux /usr/sbin/init

Si queremos usar "yay" necesitamos tener systemd corriendo y también tener git instalado.
