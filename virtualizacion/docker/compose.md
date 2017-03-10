https://docs.docker.com/compose/

# Instalacion
pacman -S docker-compose


curl -L https://github.com/docker/compose/releases/download/1.2.0/docker-compose-`uname -s`-`uname -m` > docker-compose
sudo mv docker-compose /usr/local/bin/
sudo chmod +x /usr/local/bin/docker-compose

wget https://raw.githubusercontent.com/docker/compose/1.2.0/contrib/completion/bash/docker-compose
sudo mv docker-compose /etc/bash_completion.d/


# Uso
Generamos ficheros YAML con una configuración donde decimos que containers levantamos y con que configuraciones.
docker-compose.yml
