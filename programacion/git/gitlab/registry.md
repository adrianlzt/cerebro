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


