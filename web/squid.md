http://www.squid-cache.org/

Squid is a caching proxy for the Web supporting HTTP, HTTPS, FTP, and more. It reduces bandwidth and improves response times by caching and reusing frequently-requested web pages. Squid has extensive access controls and makes a great server accelerator. It runs on most available operating systems, including Windows and is licensed under the GNU GPL.

Hay una cosa con el squid y es que no refresca el DNS
Por lo que si uno de los nodos de donde hace proxy ha cambiado de IP, deja de llegar


# CacheManager
https://wiki.squid-cache.org/Features/CacheManager
Para obtener estadísticas

Variante CLI:
https://wiki.squid-cache.org/SquidClientTool
squidclient mgr:info

Variante CGI
https://wiki.squid-cache.org/ManagerCgiTool


# Config
http://www.squid-cache.org/Doc/config/
http://wiki.squid-cache.org/ConfigExamples
http://www.squid-cache.org/Versions/v5/cfgman/

La configuración que viene por defecto usa CONNECT para HTTPS. Esto quiere decir que se tunela sin intentar cachear.
Si queremos poder cachear HTTPS tendremos que aceptar el certificado que instalemos en Squid.

Ejemplo: https://scubarda.com/2020/03/23/configure-squid-proxy-for-ssl-tls-inspection-https-interception/


## ACL
http://wiki.squid-cache.org/SquidFaq/SquidAcl

Con las ACL y http_access filtramos quien puede acceder al proxy, a usar CONNECT (para https) o a métricas de squid.


## TLS
Que squid use https en vez de http.


# Monitoring
http://www.squid-cache.org/Misc/monitor.html
