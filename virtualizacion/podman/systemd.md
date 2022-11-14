# Ejecutar comando en un pod usando systemd
systemd-run --scope --user podman container exec -it quizzical_newton bash


# Systemd
Si queremos generar una unit para un pod

podman generate systemd --name nombrePod > mi.unit
  --name es para usar el nombre de pod en vez del id
