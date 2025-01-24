<http://www.squid-cache.org/>

Squid is a caching proxy for the Web supporting HTTP, HTTPS, FTP, and more. It reduces bandwidth and improves response times by caching and reusing frequently-requested web pages. Squid has extensive access controls and makes a great server accelerator. It runs on most available operating systems, including Windows and is licensed under the GNU GPL.

Hay una cosa con el squid y es que no refresca el DNS
Por lo que si uno de los nodos de donde hace proxy ha cambiado de IP, deja de llegar

# CacheManager

<https://wiki.squid-cache.org/Features/CacheManager>
Para obtener estadísticas

Variante CLI:
<https://wiki.squid-cache.org/SquidClientTool>
squidclient mgr:info

Variante CGI
<https://wiki.squid-cache.org/ManagerCgiTool>

# Config

<http://www.squid-cache.org/Doc/config/>
<http://wiki.squid-cache.org/ConfigExamples>
<http://www.squid-cache.org/Versions/v5/cfgman/>

La configuración que viene por defecto usa CONNECT para HTTPS. Esto quiere decir que se tunela sin intentar cachear.
Si queremos poder cachear HTTPS tendremos que aceptar el certificado que instalemos en Squid.

Ejemplo: <https://scubarda.com/2020/03/23/configure-squid-proxy-for-ssl-tls-inspection-https-interception/>

## ACL

<http://wiki.squid-cache.org/SquidFaq/SquidAcl>

Con las ACL y http_access filtramos quien puede acceder al proxy, a usar CONNECT (para https) o a métricas de squid.

## TLS

Que squid use https en vez de http.

Comprobar esta configuración, parece incorrecta.

```
https_port 3129 tls-cert=/etc/squid/ssl/squid.pem tls-key=/etc/squid/ssl/squid.key
```

## Http basic auth

<https://wiki.squid-cache.org/Features/Authentication>

Poner basic auth al proxy:

```
auth_param basic program /usr/lib/squid/basic_ncsa_auth /etc/squid/passwd
auth_param basic children 5
auth_param basic realm Squid Proxy Authentication
auth_param basic credentialsttl 5 hours
auth_param basic casesensitive off
# Aqui creamos una acl de nombre "authenticated" para los usuarios logueados
acl authenticated proxy_auth REQUIRED
# Aqui permitimos pasar a los usuarios logueados y no permitimos pasar al resto
http_access allow authenticated
http_access deny all
```

Si tenemos problemas podemos subir el nivel de debug del Authenticator:

```
debug_options 29,5
```

Podemos probar si las claves están bien configuradas llamando al helper directamente:

```bash
$ /usr/lib/squid/basic_ncsa_auth /etc/squid/passwd
myuser mypass
OK
myuser nopass
ERR
```

Para generar el fichero de /etc/squid/passwd:

```bash
htpasswd -c /etc/squid/passwd user1
```

# Monitoring

<http://www.squid-cache.org/Misc/monitor.html>

# Docker

<https://hub.docker.com/r/ubuntu/squid>

```bash
docker run --rm -it --name squid -p 3128:3128 -e TZ=UTC ubuntu/squid:6.10-24.10_edge
```

Nos da un forward proxy funcional que acepta peticiones de la localnet (definidas como todas las redes privadas).

```bash
curl -x http://localhost:3128 https://example.com
```
