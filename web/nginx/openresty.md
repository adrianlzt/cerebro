http://githubengineering.com/rearchitecting-github-pages/

Hacer cambios incrementales de versión.
Primero sustituir un porcentaje de los servers y poco a poco ir cambiando todos los viejos por los nuevos.


Ver como gestionar el nginx como load-balancer para realizar esta tarea.
Lo hacemos con un script LUA


# Openresty
https://openresty.org/


# LUA
rewrite_by_lua
rewrite_by_lua_file

ngx.var.PARAMETRO
  web.com/?PARAMETRO=x

ngx.var.user_upstream


# Enrutado
Primero deberemos elegir porque campo se enruta:
Por ejemplo, cogemos un valor, lo pasamos a int y le hacemos un mod(,10)
 == 0, enviamos al nuevo server
 != 0, enviamos a los viejos
 estamos separando un 10% del tráfico al nuevo server

Nginx + ngx_lua + luaJIT (open resty)
http://githubengineering.com/rearchitecting-github-pages/
https://github.com/brnt/openresty-rpm-spec
https://www.nginx.com/resources/wiki/modules/lua/?highlight=lua#lua-installation 
http://artifactory.hi.inet/artifactory/yum-ccb-ci/nginx-lua/x84_64/


# nginScript
Nginx + nginScript (just launched)
https://www.nginx.com/blog/launching-nginscript-and-looking-ahead/
https://www.nginx.com/blog/introduction-nginscript/

VM de javascript corriendo dentro de nginx.
Se permite meter configuración escrita en Javascript, evaluado en runtime por petición

Ejemplos de cosas que se pueden hacer:
 - routing dinámico, por ejemplo según un parámetro de la URL
 - limitar tráfico abusivo, o denegar las peticiones
 - mover parte de tu codigo de enrutado a nginx
 - generar los logs con un formato deteminado (por ejemplo para que los ingeste ELK o Splunk)çç
 - canary releases
 - ir haciendo un cambio progresivo de tráfico entre un frontend viejo y el nuevo
 - hacer de balanceador de SQL examinando las peticiones y actuando en consecuencia


## Instalacion
apt-get install nginx-module-njs
yum install nginx-module-njs

nginx.conf:
load_module modules/ngx_http_js_module.so;

nginx -s reload
