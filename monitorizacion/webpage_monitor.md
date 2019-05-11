Conceptos:

Time to First Byte (TTFB)
Tiempo que pasa desde que el usuario envia la request HTTP hasta que recibe el primer byte de respuesta.
En este tiempo entra:
 - tiempo que tarda en llegar la request del usuario
 - tiempo de procesado/renderizado de la respuesta
 - tiempo de red desde que el servidor envia la respuesta hasta que llega al usuario
TTFB under 100ms is fantastic. Anything between 200-500ms is standard, between 500ms – 1s is less than ideal and anything greater than 1s should likely be investigated further.

Time to last byte (TTLB)
Tiempo hasta que recibimos el último byte

Speed index
https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/metrics/speed-index
measures how long until most of what you can see within your browser screen is loaded

# Webpagetest
https://www.webpagetest.org
http://shop.oreilly.com/product/0636920033592.do
Nos permite usar una API para testear la respuesta de nuestra web
  https://sites.google.com/a/webpagetest.org/docs/advanced-features
  API XML
  CLI
  Libreria de python
Parece que de manera gratuita. Restricciones:
  You can't run tests from every location at the exact time you want (there is a queue for popular locations for instance, your test can take some minutes to run)
  One API key only allows 200 tests a day
Para obtener una API KEY: http://www.webpagetest.org/getkey.php
Tambien podemos bajarnos el software que usa por debajo: https://github.com/WPO-Foundation/webpagetest
Documentacion de como desplegar en Google Cloud o Amazon EC2: https://github.com/WPO-Foundation/webpagetest-docs/blob/master/user/Private%20Instances/README.md
Lib para usar con python: https://github.com/xslates/speedforce
  por defecto nos lanza un test y un repeat, asi que gastamos dos de los 200req/dia


## Docker
Server, interfaz web donde haremos las peticiones para lanzar tests:
docker run --rm -it -p 8080:80 webpagetest/server

Agente
docker run --rm -it --link zealous_heyrovsky:wptserver -e SERVER_URL="http://wptserver/work/" -e "LOCATION=docker" --init webpagetest/agent
  importante la barra final del SERVER_URL

El agente lanzará peticiones al server tipo:
curl "http://wptserver/work/getwork.php?f=json&shards=1&reboot=1&location=docker&pc=ea4de2bd8e3e&version=19.04&screenwidth=1920&screenheight=1200&freedisk=65.340&upminutes=17886"



# Otros
https://serps.com/library/how-to-measure-your-website-speed-and-load-times/

https://developers.google.com/speed/pagespeed/insights/
  da consejos para optimizar la web y chequea si estamos aplicando esas optimizaciones
  diferencia entre móvil y pc

http://gtmetrix.com/
  da consejos sobre mejoras con bastante detalle
  da una puntuación según los tiempos de respuesta
  podemos ver la cascada de peticiones para ver donde se va el tiempo

https://a.blazemeter.com/app/#/
  nos lanza unos tests de carga con varios usuarios y nos mide los tiempos de respuesta

https://tools.keycdn.com/speed
  nos muestra la cascada de peticiones hasta cargar la web completa

https://tools.keycdn.com/performance
  prueba los tiempos TTFB desde distintos puntos del mundo


Chrome: https://developers.google.com/web/tools/chrome-devtools/network-performance/reference#timing-explanation
Con el inspeccionar de chrome podemos ver los tiempos TTFB y de descarga del contenido.


https://www.machmetrics.com/speed-blog/average-page-load-times-websites-2018/
Tablas con tiempos de respuesta y tamaños de webs según industria y localización.
El tiempo recomendado de carga es <3s
El tamaño recomendado <500KB
Número de recursos <50
TTFB < 1.3s
