Scale cube
http://microservices.io/articles/scalecube.html

Podemos escalar de 3 modos:
 - eje x: creando más copias de la aplicación
 - eje y: dividir según funcionalidad. En "verbos" y "nombres". Ejemplo, servicio para checkout (verbo). O servicio para clientes (nombre)
 - eje z: dividir (shard) la carga según algún parámetro en diferentes copias (una web para europa, otra para usa).
          complica la aplicación. Podemos tener problemas si tenemos que reparticionar




http://highscalability.com/blog/2013/8/26/reddit-lessons-learned-from-mistakes-made-scaling-to-1-billi.html
It’s not necessary to build a scalable architecture from the start. You don’t know what your feature set will be when you start out so you want know what your scaling problems will be. Wait until your site grows so you can learn where your scaling problems are going to be.
