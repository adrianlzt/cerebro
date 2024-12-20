<https://github.com/containers/podman/blob/main/docs/tutorials/socket_activation.md>

Levantar un unix socket para simular como ser docker.

systemctl enable --now  podman.socket

unix://$XDG_RUNTIME_DIR/podman/podman.sock
