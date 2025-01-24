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

Se pueden hacer reglas negativas:

```
http_access deny !authenticated
```

Crear una ACL para definir una red:

```
acl localnet src 0.0.0.1-0.255.255.255  # RFC 1122 "this" network (LAN)
acl localnet src 10.0.0.0/8             # RFC 1918 local private network (LAN)
acl localnet src 100.64.0.0/10          # RFC 6598 shared address space (CGN)
acl localnet src 169.254.0.0/16         # RFC 3927 link-local (directly plugged) machines
acl localnet src 172.16.0.0/12          # RFC 1918 local private network (LAN)
acl localnet src 192.168.0.0/16         # RFC 1918 local private network (LAN)
acl localnet src fc00::/7               # RFC 4193 local private network range
acl localnet src fe80::/10              # RFC 4291 link-local (directly plugged) machines
```

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

Para generar el fichero de /etc/squid/passwd (usar MD5):

```bash
htpasswd -nbm username 123456789
```

<https://wiki.squid-cache.org/ConfigExamples/Authenticate/Ncsa>

Ojo que el helpe no soporta todos los métodos de encriptación:
Squid helpers support DES, MD5 and SHA encryption of the passwords file. Bcrypt requires additional support in the crypto libraries Squid is built with so may or may not work.

# Monitoring

<http://www.squid-cache.org/Misc/monitor.html>

## SNMP

<https://wiki.squid-cache.org/Features/Snmp>
<https://www.zabbix.com/integrations/squid>

Config:

```
snmp_port 3401
acl snmpMonitoring snmp_community CHANGEME
acl OPEN src 0.0.0.0/0
snmp_access allow snmpMonitoring OPEN
snmp_access deny all
```

Testear:

```bash
snmpwalk -v 2c -c CHANGEME 127.0.0.1:3401 nsExtendOutput1
```

## CacheManager

<https://wiki.squid-cache.org/Features/CacheManager/Index>

```bash
apt install squidclient
squidclient mgr:info
```

Hacen falta las ACLs:

```
http_access allow localhost manager
http_access deny manager
```

# Docker

<https://hub.docker.com/r/ubuntu/squid>

```bash
docker run --rm -it --name squid -p 3128:3128 -e TZ=UTC ubuntu/squid:6.10-24.10_edge
```

Nos da un forward proxy funcional que acepta peticiones de la localnet (definidas como todas las redes privadas).

```bash
curl -x http://localhost:3128 https://example.com
```

# Ejemplo de configuración

Ejemplo usado para usarlo como proxy HTTPs para conexiones WinRM-TLS:

```
# Expose Squid with HTTPs, using self-signed certs
https_port 3129 tls-cert=/etc/ssl/certs/ssl-cert-snakeoil.pem tls-key=/etc/ssl/private/ssl-cert-snakeoil.key
coredump_dir /var/spool/squid

# Set max_filedescriptors to avoid using system's RLIMIT_NOFILE. See LP: #1978272
max_filedescriptors 1024

# Logs are managed by logrotate on Debian
logfile_rotate 0

# Basic auth
auth_param basic program /usr/lib/squid/basic_ncsa_auth /etc/squid/passwd
auth_param basic children 5
auth_param basic realm Squid Proxy Authentication
auth_param basic credentialsttl 5 hours
auth_param basic casesensitive off
acl authenticated proxy_auth REQUIRED

# SNMP monitoring
snmp_port 3401
acl snmpMonitoring snmp_community CHANGEME
acl OPEN src 0.0.0.0/0
snmp_access allow snmpMonitoring OPEN
snmp_access deny all

# Allow only TLS (CONNECT) connections to this remote port
acl winRMTLS port 5986        # WinRM with TLS
http_access deny CONNECT !winRMTLS

# Allow acces to CacheManager only on localhost
http_access allow localhost manager
http_access deny manager

# Only allow connections from auth users
http_access allow authenticated
http_access deny all

# To show verbose debugging information
#debug_options All,5
```
