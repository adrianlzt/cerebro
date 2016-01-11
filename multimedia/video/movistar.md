Movistar+ funciona mediante transmision de video multicast.
Todos los canales llegan al equipo contra el que conecta nuestro router.
El deco elige que canal ver y se registra en un determinado canal multicast a través del que recibe el video

En esta web se pueden ver las ips multicast que corresponden a cada canal.
http://www.adslzone.net/postt350532.html (más abajo viene explicado como ver correctamente el video. Lo resumo más abajo)
Script para buscar canales: http://pastebin.com/raw.php?i=f9q8NqEM (copiado en este dir)

Para ver la TV bien deberemos estar conectados por cable.
Por wifi se entrecorta mucho.
No noto diferencia entre estar en un rango "normal" del DHCP o en el especial del deco.

Podemos abrir varios canales simultaneamente además de ver otro canal con el deco.

# IPNA / Retransmitir movistar+ desde un servidor al resto de la LAN mediante uPNP
https://web.archive.org/web/20150108202847/http://es.infinbox.com/productos/modulo-ipna/mipna_descarga_trial
http://infinbox-data.com/modulo-ipna/manual/
http://bandaancha.eu/foros/modulo-ipna-aplicacion-gratuita-ver-1691848
El instalador y la licencia lo he dejado en este dir con nombres: movistar_ipna_licencia.bin movistar_modulo-ipna_2.05_linux_amd64.deb

Como montar RASPBERRY + OPENELEC + IPNA + VPN: http://www.adslzone.net/postt360030.html



# Como ponernos en el rango del deco (no noto que vaya mejor ni peor que en un rango normal)
Para ver bien la tv tenemos que configurar nuestra ip como la del deco+1 y mascara de red 255.255.255.248
Para saber la ip del deco miramos su MAC (pegatina en la parte de abajo) y luego en la tabla ARP del router: http://192.168.1.1/arpview.cmd

Si por ejemplo tiene la IP 192.168.1.200, nuestra configuracion será:
ip: 192.168.1.201
mask: 255.255.255.248
gw: 192.168.1.1

El rango del deco se define aqui: http://192.168.1.1/lancfg2.html
En "Vendor Class ID (DHCP option 60) differential IP range assignment: (A maximum 32 entries can be configured)"
Más info sobre esto:
http://comunidad.movistar.es/t5/Soporte-T%C3%A9cnico-MOVISTAR/DHCP-Option-240/td-p/1754336
http://comunidad.movistar.es/t5/Soporte-T%C3%A9cnico-de-Fibra-%C3%93ptica/VG-8050-Vendor-Class-ID/td-p/2011927

# Curiosidades
Como el cambio entre un canal y otro (deregistro y registro multicast) es lento. La solucion es que lo servidores locales tienen un cacheo de todos los canales y nos sirven ese contenido inmediatamente. Luego, entre los 3" y 10" se produce la sincronización con el multicast (se observa un pequeño corte en el video y/o audio).

Si logramos emitir en rtp:// desde nuestro pc podríamos verlo desde el deco de Movistar+.


