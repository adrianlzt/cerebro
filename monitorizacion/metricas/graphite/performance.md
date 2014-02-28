http://www.aosabook.org/en/graphite.html
7.5. An Obvious Bottleneck
  Usar memcached con django para cachear respuestas

7.6. Optimizing I/O
  El cuello de botella al escribir métricas es el seek time del disco, ya que es necesario hacer pequeñas escrituras a un gran número de ficheros.


Usar un disco o LUN específico para /opt/graphite


http://shokunin.co/blog/2013/03/16/graphite_on_ec2.html
Configurar carbon para que ejecute varios servicios cache, escuchando en distintos puertos y escribiendo en distintos discos. 
Esto evitará problemas con los IOPS de los discos.
El problema es que tenemos que agrupar a los clientes para que envien a distintos puertos.

Don't use the relay feature as that process tends to use up CPU and you start dropping updates. Use puppet or chef to spread your clients over various ports.
When installing the web component, don't use SQL lite, start with MySQL from the beginning


https://answers.launchpad.net/graphite/+question/212209
Scaling graphite, recomendaciones.


https://answers.launchpad.net/graphite/+question/202816
Solucionando disk bottelneck
