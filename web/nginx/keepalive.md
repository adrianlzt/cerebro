<http://nginx.org/en/docs/http/ngx_http_upstream_module.html#keepalive>

La idea es mantener la conexión nginx-upstream de manera persistente.

Si activamos keepalive en el upstream, nginx mantendrá la conexión abierta y la reutilizará para las siguientes peticiones.
Deberemos meter en el location el proxy_http_version 1.1 para que funcione correctamente.
Y también definier el proxy_set_header Connection "" para dejar que nginx gestione la conexión.

```
http {
        upstream  kibana {
              server kibana:5601;
              keepalive 30;
        }

        server {
              listen 80;
              server_name _;

              location / {
                      proxy_pass http://kibana;
                      proxy_http_version 1.1;
                      proxy_set_header Connection "";
              }
        }
}
```

Con kibana, si no seteaba correctamente la versión de http y quitaba la cabecera Connection, no funcionaba correctamente.
Habia peticiones que se daban timeout.

Entorno de pruebas con kibana y ES: <https://github.com/adrianlzt/elastic-stack-docker-part-one>
