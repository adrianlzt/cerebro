Si queremos ofrecer mapas online podemos usar MapServer usando WMS.

<https://github.com/camptocamp/docker-mapserver/>

Para obtener las capabilities mirar:
<https://HOST/?map=/etc/mapserver/mapserver.map&request=GetCapabilities&service=WMS>

Para tener https puse por delante caddy, pero tuve que "hackear" un poco el CMD del contenedor para que internamente exponga el puerto 443 y asi los campos "OnlineResource" del GetCapabilities aparezcan correctamente (apuntando a https con el puerto 443, si no me ponía el puerto 80).
