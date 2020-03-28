https://k3s.io/

mirar distros.md


# Install
En arch
aur/k3s

# Run
systemctl start k3s

Por debajo arranca un container con containerd.


# Config
## Server
Podemos editar el unit para pasarle parámetros al server.
Mirar:
k3s server --help


## Clientes
Config para kubectl
/etc/rancher/k3s/k3s.yaml


# Volumes
Tenemos un storageclass "local-path" por defecto.
Deberemos crear los PV a mano.
