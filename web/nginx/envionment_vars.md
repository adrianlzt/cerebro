https://serverfault.com/a/755541

Usaremos envsubst para, en el arranque, cambiar las variables de entorno por sus valores.
Debemos tener cuidado cuando en la config hay cosas tipo:
  proxy_set_header        X-Forwarded-Host $host;
Ya que esa variable no la queremos modificar

image: nginx
volumes:
 - ./mysite.template:/etc/nginx/conf.d/mysite.template
ports:
 - "8080:80"
environment:
 - NGINX_HOST=foobar.com
 - NGINX_PORT=80
 - DOLLAR=$
command: /bin/bash -c "envsubst < /etc/nginx/conf.d/mysite.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"

Si tenemos texto con el formato $xxx lo pondremos:
${DOLLAR}xxx
Ej.:
proxy_set_header        X-Forwarded-Host ${DOLLAR}host;


Las que queremos que se cambien:
server_name  ${WEB_DOMAIN} www.${WEB_DOMAIN};
