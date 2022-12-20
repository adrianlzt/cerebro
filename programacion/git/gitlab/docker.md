docker run --name gitlab -v "$PWD/data:/var/opt/gitlab" -v "$PWD/etc:/etc/gitlab" -p 2222:22 -p 8070:80 -p 8443:443 -p 9090:9090 -d gitlab/gitlab-ce
  el puerto 9090 es la interfaz de prometheus

Tarda algún minuto en arrancar.
Podemos consultar "docker ps" donde tendremos el "health" de la imagen que nos dira si está starting.
Tras arrancar nos pedirá que definamos la pass de administrador (admin@example.com)

# Configuración
Configure GitLab for your system by editing /etc/gitlab/gitlab.rb file
And restart this container to reload settings.
To do it use docker exec:

  docker exec -it gitlab vim /etc/gitlab/gitlab.rb
  docker restart gitlab

Tendremos que definir al menos el host para acceder a gitlab y el host ssh: https://docs.gitlab.com/omnibus/settings/configuration.html#configuring-the-external-url-for-gitlab
Si modificamos el puerto de esa variable (external_url) se modificará el puerto donde escucha gitlab
Si cambiamos el puerto de la web de gitlab, el container ahora escuchará en ese puerto. Tendremos que modificar el -p

Para modificar el puerto ssh: https://stackoverflow.com/a/26935369/1407722
/etc/gitlab/gitlab.rb
gitlab_rails['gitlab_shell_ssh_port'] = 766

docker restart gitlab
otra opcion:
docker exec -it gitlab gitlab-ctl reconfigure

## LDAP

Verificar que users de LDAP tienen acceso
gitlab-rake gitlab:ldap:check RAILS_ENV=production


## TLS
https://docs.gitlab.com/omnibus/settings/nginx.html#enable-https

/etc/gitlab/gitlab.rb
external_url 'https://gitlab.example.com:4567'

mkdir -p /etc/gitlab/ssl
chmod 700 /etc/gitlab/ssl
cp gitlab.example.com.key gitlab.example.com.crt /etc/gitlab/ssl/

gitlab-ctl reconfigure



## Email
https://docs.gitlab.com/omnibus/settings/smtp.html

Por defecto gitlab intentara enviar emails usando sendmail, pero podemos configurar un servidor SMTP de salida.




# Admin
Si usamos la version de docker (y supongo que otras) viene un comando para hacer tareas administrativas.

Ver procesos
gitlab-ctl status

Reiniciar un proceso:
gitlab-ctl restart puma


## Postgres
Si queremos acceder a la db postgres
su -c "/opt/gitlab/embedded/bin/psql -h /var/opt/gitlab/postgresql -U gitlab gitlabhq_production" git

## Redis
redis-cli -s /var/opt/gitlab/redis/redis.socket

Han desactivado el comando keys
https://docs.gitlab.com/omnibus/settings/redis.html#renamed-commands



