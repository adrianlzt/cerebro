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

Nginx + nginScript (just launched)
https://www.nginx.com/blog/launching-nginscript-and-looking-ahead/
