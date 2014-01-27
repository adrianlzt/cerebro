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

# Test
sudo docker run -i -t ubuntu /bin/bash
Esto bajará la imagen ubuntu (ya que no la tendremos) y arrancar la shell dentro del container

# Network - UFW
Por defecto se dropea todo el tráfico. Para cambiar la política
/etc/default/ufw
DEFAULT_FORWARD_POLICY="ACCEPT"

sudo ufw reload

Si tengo problemas con la red, mirar que no tenga alguna vpn montada que pueda estar fastidiando.
