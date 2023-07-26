sudo podman run --rm -it --privileged docker:dind


# Rootless
No me funciona en Arch Linux arco 6.4.4-arch1-1
podman version 4.5.1

En el journald del host
jul 26 11:36:57 arco kernel: overlayfs: fs on '/var/lib/docker/overlay2/l/PXLIYQBSSUHLQVPRVFOEFPZYQN' does not support file handles, falling back to xino=off.

Algo parece de overlayfs. No he seguido investigando.
