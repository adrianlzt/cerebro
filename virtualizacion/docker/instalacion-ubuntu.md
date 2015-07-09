## Ubuntu Raring 13.04

# Add the Docker repository key to your local keychain
# using apt-key finger you can check the fingerprint matches 36A1 D786 9245 C895 0F96 6E92 D857 6A8B A88D 21E9
sudo sh -c "curl https://get.docker.io/gpg | apt-key add -"

# Add the Docker repository to your apt sources list.
sudo sh -c "echo deb http://get.docker.io/ubuntu docker main > /etc/apt/sources.list.d/docker.list"

# update
sudo apt-get update

# install
sudo apt-get install lxc-docker

# Activar en systemd
sudo systemctl start docker
sudo systemctl enable docker

# Meter a los usuarios en el grupo docker
sudo gpasswd -a adrian docker

# Tener cgroups de memoria y swap (no obligatorio)
GRUB_CMDLINE_LINUX=cgroup_enable=memory swapaccount=1"
En /etc/default/grub

# Necesario para networking (creo que lo hace ya la instalación)
sysctl -w net.ipv4.ip_forward = 1

# Test
lxc-checkconfig
sudo docker run -i -t ubuntu /bin/bash
Esto bajará la imagen ubuntu (ya que no la tendremos) y arrancar la shell dentro del container

# Network - UFW
Por defecto se dropea todo el tráfico. Para cambiar la política
/etc/default/ufw
DEFAULT_FORWARD_POLICY="ACCEPT"

sudo ufw reload

Si tengo problemas con la red, mirar que no tenga alguna vpn montada que pueda estar fastidiando.


# Apparmor, usado por docker para confinar los contenedores
Si tenemos problemas con apparmor y permisos:
apt-get install apparmor-utils
aa-complain docker lxc-start
