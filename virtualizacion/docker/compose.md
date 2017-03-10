https://docs.docker.com/compose/

# Instalacion
pacman -S docker-compose


curl -L https://github.com/docker/compose/releases/download/1.2.0/docker-compose-`uname -s`-`uname -m` > docker-compose
sudo mv docker-compose /usr/local/bin/
sudo chmod +x /usr/local/bin/docker-compose

wget https://raw.githubusercontent.com/docker/compose/1.2.0/contrib/completion/bash/docker-compose
sudo mv docker-compose /etc/bash_completion.d/


# Uso
https://docs.docker.com/compose/compose-file/
Generamos ficheros YAML con una configuración donde decimos que containers levantamos y con que configuraciones.
docker-compose.yml


docker-compose up



# docker-compose.yml

## command
command: bundle exec thin -p 3000

## Variables entorno
Se pueden definir en un fichero .env en el workdir

O poner en el yml
web:
  environment:
    - DEBUG=1
