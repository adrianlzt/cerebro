Servidor opensource de git.

# docker
docker run --name gitlab -v "$PWD/data:/var/opt/gitlab" -v "$PWD/etc:/etc/gitlab" -p 2222:22 -p 8070:80 -p 8443:443 -p 9090:9090 -d gitlab/gitlab-ce
  el puerto 9090 es la interfaz de prometheus

Tarda algún minuto en arrancar.
Podemos consultar "docker ps" donde tendremos el "health" de la imagen que nos dira si está starting.
Tras arrancar nos pedirá que definamos la pass de administrador (admin@example.com)

## Configuración
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


## Postgres
Si queremos acceder a la db postgres
su -c "/opt/gitlab/embedded/bin/psql -h /var/opt/gitlab/postgresql -U gitlab gitlabhq_production" git



# TLS
https://docs.gitlab.com/omnibus/settings/nginx.html#enable-https

/etc/gitlab/gitlab.rb
external_url 'https://gitlab.example.com:4567'

mkdir -p /etc/gitlab/ssl
chmod 700 /etc/gitlab/ssl
cp gitlab.example.com.key gitlab.example.com.crt /etc/gitlab/ssl/

gitlab-ctl reconfigure



# Email
https://docs.gitlab.com/omnibus/settings/smtp.html

Por defecto gitlab intentara enviar emails usando sendmail, pero podemos configurar un servidor SMTP de salida.



# API
https://docs.gitlab.com/ee/api/README.html
Clientes para lenguajes: https://about.gitlab.com/applications/#api-clients

Ejemplo usando como auth un private token:
curl --header "Private-Token: xxx" http://localhost:8070/api/v4/projects | jq

Lista de grupos:
curl --header "Private-Token: xxx" http://localhost:8070/api/v4/groups | jq

Crear un repo:
curl --header "Private-Token: xxx" http://localhost:8070/api/v4/projects -XPOST -d 'name=pruebaapi3' -d 'description=pepe' | jq

Crear un repo en un grupo determinado:
curl --header "Private-Token: xxx" http://localhost:8070/api/v4/projects -XPOST -d 'name=pruebaapi3' -d 'description=pepe' -d 'namespace_id=34' | jq



# Registry
https://docs.gitlab.com/ce/administration/container_registry.html

A partir de la version 8.8 tiene un registy de docker
Veremos las imagenes y la conf necesaria en cada repo, en el menu de la izquierda, "Registry"


# Attack protection / DoS
https://docs.gitlab.com/ee/security/rack_attack.html
Protección para evitar ataques de fuerza bruta.

Si estamos detrás de un proxy tendremos que marcarlo para que gitlab coja la ip real.
https://docs.gitlab.com/omnibus/settings/nginx.html
trusted_proxies

En el caso de ip bloqueada la deberemos limpiar del redis
redis-cli del cache:gitlab:rack::attack:allow2ban:ban:172.22.0.6

Podemos ver los bloqueos en /var/log/gitlab/gitlab/production.log


# CI/CD
https://docs.gitlab.com/ee/ci/quick_start/

Examples:
https://docs.gitlab.com/ee/ci/examples/
https://gitlab.com/gitlab-org/gitlab/-/tree/master/lib/gitlab/ci/templates

## Auto DevOps
Si activamos AutoDevOps, a todos los proyectos se le aplica este .gitlab-ci.yml (en caso de no tener uno custom).
https://gitlab.com/gitlab-org/gitlab/-/blob/master/lib/gitlab/ci/templates/Auto-DevOps.gitlab-ci.yml

Este fichero chequea si existen ciertos ficheros y entonces considera que hace "match" y se ejecuta.

Parece que no nos dejan modificar el fichero de forma global (https://gitlab.com/gitlab-org/gitlab/-/issues/20169)
En el despliegue con docker está en:
/opt/gitlab/embedded/service/gitlab-rails/lib/gitlab/ci/templates/Auto-DevOps.gitlab-ci.yml

Podemos modificarlo para setear nuestros propios valores.

Una idea es poner en ese fichero únicamente un include y así gestionamos todo nuestro auto devops custom en un repo.
EL PROBLEMA es que este repo tiene que ser público.
include:
  - project: 'cicd/auto-devops'
    file: 'main.yml'


## .gitlab-ci.yml
https://docs.gitlab.com/ee/ci/yaml/

### workflow
Suelen ser unos condicionales que deciden de forma global si se va a ejecutar la pipeline.
Típicamente chequeamos si estamos en una tag, mr, branch, etc.

Hay unos templates para los casos típicos:
https://docs.gitlab.com/ee/ci/yaml/workflow.html#workflowrules-templates

### includes
Importar otros ficheros de pipelines.

Podemos también usar condicionales para decidir si importarlos
https://docs.gitlab.com/ee/ci/yaml/includes.html#use-rules-with-include
https://docs.gitlab.com/ee/ci/yaml/workflow.html

Parece que para hacer include de otros ficheros tengo que usar template y que el fichero termine en .gitlab-ci.yml
Al menos eso me pasa al modificar el Auto-DevOps.gitlab-ci.yml


# Upgrade
Con esta herramienta nos dice por las versiones que tenemos que ir saltando para subir entre majors.
https://gitlab-com.gitlab.io/support/toolbox/upgrade-path/
