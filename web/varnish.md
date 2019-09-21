https://www.varnish-cache.org/

Varnish is a web application accelerator. You install it in front of your web application and it will speed it up significantly.


Mirar tambien nginx/cache.md tal vez sea más sencillo si ya estamos usando nginx en vez de montar un varnish


Por defecto solo se cachean las peticiones GET.
Para las POST tenemos que usar un VMOD.



# Docker
https://hub.docker.com/r/emgag/varnish/
Imagen con varios vmod ya cargados


# Configuración

Ejemplo de una config que pasa requests a httpbin.org (esa ip 3.xxx)
/etc/varnish/default.vcl
vcl 4.0;
backend default {
    .host = "3.219.197.134";
    .port = "8000";
}

curl -w "Time total: %{time_total}\n" -H "Host: httpbin.org" localhost:8000/delay/1
  la primera vez tardará ~1200ms, las siguientes ~1ms



# Logs / debug
Podemos sacar las peticiones que está parseando varnish con el comando varnishlog.

varnishlog -i VCL_call,ReqMethod,BereqMethod,ReqURL,BereqURL,VCL_Log

Si no hace hit veremos como está haciendo la petición al backend:
<< BeReq

En caso de estar cacheado no veremos BeReq y veremos la request con la VCL_call HIT

VCL_call=MISS es que no se encontró en la cache, pero que se va a guardar para la próxima.
VCL_call=PASS es que no se va a intentar cachear

Podemos meter cadenas propias en la config con:
import std;
std.log("Will cache POST for: " + req.host + req.url);



# Varnish modules (VMOD)
https://github.com/nigoroll/varnish-modules
  repo más actualizado que el oficial


## Build
https://github.com/varnish/varnish-modules

Error compilando en Arch.
Tal vez el otro repo más actualizado?
Uso mejor docker

Hace falta compilarlos para lo que necesitamos el código de varnish
wget https://varnish-cache.org/_downloads/varnish-6.2.1.tgz
wget https://download.varnish-software.com/varnish-modules/varnish-modules-0.15.0.tar.gz
tar zxvf varnish-6.2.1.tgz
tar zxvf varnish-modules-0.15.0.tar.gz
cd varnish-modules-0.15.0
./configure VARNISHSRC=`pwd`/../varnish-6.2.1

repo
./bootstrap
