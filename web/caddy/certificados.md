Obtener certificados para terceras aplicaciones.
Similar a la tarea que haría certbot.

https://caddy.community/t/using-caddy-to-keep-certificates-renewed/7525

Los certs los generará en (https://caddyserver.com/docs/conventions#data-directory):
~/.local/share/caddy/certificates/acme-v02.api.letsencrypt.org-directory/test.domain.com/
En una instalación por paquetes:
/var/lib/caddy/.local/share/caddy/

En el home del user que corra caddy.
