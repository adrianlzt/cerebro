<http://githubengineering.com/rearchitecting-github-pages/>

Hacer cambios incrementales de versión.
Primero sustituir un porcentaje de los servers y poco a poco ir cambiando todos los viejos por los nuevos.

Ver como gestionar el nginx como load-balancer para realizar esta tarea.
Lo hacemos con un script LUA

# Openresty

<https://openresty.org/>

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
<http://githubengineering.com/rearchitecting-github-pages/>
<https://github.com/brnt/openresty-rpm-spec>
<https://www.nginx.com/resources/wiki/modules/lua/?highlight=lua#lua-installation>
<http://artifactory.hi.inet/artifactory/yum-ccb-ci/nginx-lua/x84_64/>

# nginScript / njs

Nginx + nginScript (just launched)
<https://www.nginx.com/blog/launching-nginscript-and-looking-ahead/>
<https://www.nginx.com/blog/introduction-nginscript/>
<https://github.com/nginx/njs-examples>

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

En arch:
pacman -S nginx-mod-njs
load_module /usr/lib/nginx/modules/ngx_http_js_module.so;

nginx -s reload

## Processing phase

Processing Phase                              HTTP Module                   Stream Module
Access – Authentication and access control    auth_request and js_content   js_access
Pre-read – Read/write payload                 N/A                           js_preread
Filter – Read/write response during proxy     js_body_filter
                                              js_header_filter              js_filter
Content – Send response to client             js_content                    N/A
Log / Variables – Evaluated on demand         js_set                        js_set

Si queremos modificar el body que recibimos de un cliente, usaremos una async function con js_content usando una r.subrequest.
Si queremos modificar la respuesta de un proxy antes de pasarla al cliente usaremos js_body_filter.

## Debug

nginx.conf

```

http {
  error_log /tmp/error.log info;
```

script.js

```
function foo(r, data, flags) {
  try {
    r.log("Data: " + JSON.stringify(data));
```

## Ejemplo

transform.js

```javascript
async function transformJson(r) {
  try {
    let data = JSON.parse(r.requestText);
    r.log("Data: " + JSON.stringify(data));

    if (data.Report && Array.isArray(data.Report)) {
      let newFormat = {
        records: data.Report.map(item => ({ value: item }))
      };
      let res = await r.subrequest("/backend", { body: JSON.stringify(newFormat), method: "POST" });
      r.log("Response: " + JSON.stringify(res));
      r.return(res.status, res.responseText);
    } else {
      r.return(400, "Invalid JSON format");
    }
  } catch (e) {
    r.error("Failed to parse or transform JSON: " + e);
    r.return(400, "Bad Request");
  }
}

export default { transformJson };
```

nginx.conf

```none
daemon off;
pid /var/tmp/tmp.AXYdPmcnYG/nginx.pid;
load_module /usr/lib/nginx/modules/ngx_http_js_module.so;

events {}

http {
  js_import main from transform.js;

  client_body_temp_path /var/tmp/tmp.AXYdPmcnYG;
  fastcgi_temp_path /var/tmp/tmp.AXYdPmcnYG;
  uwsgi_temp_path /var/tmp/tmp.AXYdPmcnYG;
  scgi_temp_path /var/tmp/tmp.AXYdPmcnYG;
  access_log /var/tmp/tmp.AXYdPmcnYG/access.log;
  error_log /var/tmp/tmp.AXYdPmcnYG/error.log info;

  server {
    listen 8086;

    location /transform {
      js_content main.transformJson;
    }

    location /backend {
      proxy_pass      http://localhost:8082;
      rewrite ^/(.*)$ /topics/adrian break;
      proxy_set_header Content-Type application/vnd.kafka.json.v2+json;
    }

    location / {
        root   /var/tmp/tmp.AXYdPmcnYG/;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root /home/username/nginx/html;
    }
  }
}
```
