Si editamos el fichero
/etc/resolvconf.conf
el fichero /etc/resolv.conf siempre tendrá la configuración que digamos en este fichero.

Típicamente lo podemos usar para que apunte a nuestro dnsmaq local y unos dominios de search.

Los dominios de search lo que haran, es que cuando pongamos un hostname (sin dominio), irá probando a resolver
hostname.dominio_1_del_search
hostname.dominio_2_del_search
...

resolv_conf=/etc/resolv.conf
name_servers=127.0.0.1
search_domains="casa.lan otro.domain"


tras modificar el resolvconf.conf
resolvconf -u



# ndots
Número de puntos (".") en el nombre para que se pruebe el dominio como absoluto e intentemos conectar.
Por defecto ndots=1

Con ndots=2, un dominio "pepe.com" no se consideraría absoluto
