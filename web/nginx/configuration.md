mirar playground.md para probar configuraciones

<https://www.digitalocean.com/community/tutorials/understanding-the-nginx-configuration-file-structure-and-configuration-contexts>

Check:
nginx -t

<https://github.com/h5bp/server-configs-nginx>
Configuraciones típicas usadas en nginx.
Nos pueden ayudar a mejorar la performance.

Dentro de un bloque "server{}" podemos meter includes, pero no podremos "abrirlo" en otro fichero para meter más configs.

# Configuración simple para pruebas locales

```
daemon off;
pid /var/tmp/tmp.AXYdPmcnYG/nginx.pid;
load_module /usr/lib/nginx/modules/ngx_http_js_module.so;

events {}

http {
  js_import transform.js;

  client_body_temp_path /var/tmp/tmp.AXYdPmcnYG;
  fastcgi_temp_path /var/tmp/tmp.AXYdPmcnYG;
  uwsgi_temp_path /var/tmp/tmp.AXYdPmcnYG;
  scgi_temp_path /var/tmp/tmp.AXYdPmcnYG;
  access_log /var/tmp/tmp.AXYdPmcnYG/access.log;

  server {
    listen 8080;

    location /transform {
      js_content main.transformJson;
    }

    location @backend {
      proxy_pass      http://localhost:8000;
    }
  }
}
```

Comprobar la configuración:

```bash
nginx -t -c $PWD/nginx.conf
```

Arrancar:

```bash
nginx -c $PWD/nginx.conf
```
