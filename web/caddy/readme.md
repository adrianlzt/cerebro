https://caddyserver.com/

Alternativa a Nginx y Apache.
Muy sencillo de configurar.



Quick, local file server
caddy file-server

Public file server over HTTPS
caddy file-server --domain example.com

# HTTPS reverse proxy
caddy reverse-proxy --from example.com --to localhost:9000

Automáticamente obtiene los certs TLS con letsencrypt.
Automáticamente pone redirect de http a https.

En formato fichero Caddyfile:
```
caddy.foo.co:443
reverse_proxy :8000
```
