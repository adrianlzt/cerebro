Opciones:
 zerotier
 tailscale

# Zerotier
Crear una VPN entre distintos dispositivos conectados a internet.
ZeroTier hace de servidor.

Tenemos que instalar unos agentes en los PCs o móviles para poder acceder.

En arch:
community/zerotier-one

sc-start zerotier-one

sudo zerotier-cli join 185139001

En la interfaz web autorizar a los clientes que hayamos añadido
https://my.zerotier.com/network/

A partir de ese momento las interfaces virtuales creadas cogeran ip y tendremos conectividad.


En una prueba en la raspi, tras desconectar la WLAN tardó unos pocos minutos en reconfigurar y salir por el modem 4g.

Para configurar DNS podemos usar uno públic como duckdns.org
