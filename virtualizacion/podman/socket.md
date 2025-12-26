<https://github.com/containers/podman/blob/main/docs/tutorials/socket_activation.md>

Levantar un unix socket para simular como ser docker.

systemctl enable --now  podman.socket

unix://$XDG_RUNTIME_DIR/podman/podman.sock

# Rootless

Correr el socket de podman con otro usuario.

Allows the socket to persist when the user is not logged in:

```bash
loginctl enable-linger dockeradm
```

```bash
systemctl --user enable --now podman.socket
export CONTAINER_HOST=unix:///run/user/$(id -u)/podman/podman.sock
podman version
```
