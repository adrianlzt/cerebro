Servidor opensource de git.

# docker
docker run -v "$PWD/data:/var/opt/gitlab" -v "$PWD/etc:/etc/gitlab" -p 2222:22 -p 8070:80 -p 8443:443 -d gitlab/gitlab-ce

Tarda algún minuto en arrancar.
Podemos consultar "docker ps" donde tendremos el "health" de la imagen que nos dira si está starting.
Tras arrancar nos pedirá que definamos la pass de administrador (admin@example.com)

## Configuración
Configure GitLab for your system by editing /etc/gitlab/gitlab.rb file
And restart this container to reload settings.
To do it use docker exec:

  docker exec -it gitlab vim /etc/gitlab/gitlab.rb
  docker restart gitlab

Tendremos que definir al menos el host para acceder a gitlab y el host ssh
