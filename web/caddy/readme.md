<https://caddyserver.com/>

Alternativa a Nginx y Apache.
Muy sencillo de configurar.

Quick, local file server
caddy file-server

Public file server over HTTPS
caddy file-server --domain example.com

# HTTPS reverse proxy

caddy reverse-proxy --from example.com --to localhost:9000

sudo caddy reverse-proxy --disable-redirects --insecure --from gitlab.datadope.io:443 -i --to localhost:8060

caddy caddy reverse-proxy --from "\*:6060" --to localhost:6061

Automáticamente obtiene los certs TLS con letsencrypt.
Automáticamente pone redirect de http a https.

Solo funcionará para el dominio específicado (el resto de peticiones en el mismo puerto dará un error "tlsv1 alert internal error")

En formato fichero Caddyfile:

```
caddy.foo.co:443
reverse_proxy :8000
```

Otro formato, usando un certificado autofirmado:

```
foo.bar.com:6060 {
        tls internal {
          on_demand
        }
        reverse_proxy :6061
}
```
