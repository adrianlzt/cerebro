https://wiki.debian.org/resolv.conf
El problema es que varios demonios pueden querer modificar ese fichero.

# dhclient
Si queremos que dhclient no lo modifique podemos hacer:
``````
echo 'make_resolv_conf() { :; }' > /etc/dhcp/dhclient-enter-hooks.d/leave_my_resolv_conf_alone
chmod 755 /etc/dhcp/dhclient-enter-hooks.d/leave_my_resolv_conf_alone
``````
Este es el script que modifica el fichero:
https://github.com/isc-projects/dhcp/blob/31e68e5e3b863a4859562e0bb808888d74af7497/client/scripts/linux#L37


# resolvconf
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


# openresolv
https://roy.marples.name/projects/openresolv/
Es otra opción, disponible para centos7
https://serverfault.com/a/906578



# ndots
Número de puntos (".") en el nombre para que se pruebe el dominio como absoluto e intentemos conectar.
Por defecto ndots=1

Con ndots=2, un dominio "pepe.com" no se consideraría absoluto


single-request-reopen
Usar el mismo socket para enviar las peticiones A y AAAA
Posibles problemas de resoluciones DNS lentas (5s) por "culpa" de esa config.
El problema parece ser o un servidor que no sabe contestar a las dos, o el conntrack que se explica aqui:
https://www.weave.works/blog/racy-conntrack-and-dns-lookup-timeouts
  Aqui se muestra que conntrack tiene condiciones de carrera que pueden hacer que funcione mal al hacer DNAT con paquetes del mismo socket
No parece que sea culpa de esta opción. Por defecto glibc lanza las queries A y AAAA por el mismo socket.
Hay una opción para forzar que no (single-request)

Por lo que he visto, ciertos servidores DNS no contestan bien a las peticiones en paralelo, solo contestando a la primera de ellas en algunos casos, obligando a glibc a reenviar la petición IPv6
Parece que el problema no es tanto los server DNS si no otro hardware que puedan tener por delante.
El problema lo he visto cuando se pone un balanceador DNS por delante de los server DNS, donde si parece que le impacta el tema del conntracking que se comenta en la web de weave.works

RES_SNGLKUPREOP envia en serie https://github.com/bminor/glibc/blob/41d6f74e6cb6a92ab428c11ee1e408b2a16aa1b0/resolv/res_send.c#L1004
En la man se entiende mal.

Mirar más detalles de como se resuelven los hosts en programacion/c/getaddrinfo.md
