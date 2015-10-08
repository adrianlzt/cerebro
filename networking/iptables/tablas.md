https://es.wikipedia.org/wiki/Netfilter/iptables#Tablas

filter (por defecto)
  INPUT
  FORWARD
  OUTPUT
Esta tabla es la responsable del filtrado (es decir, de bloquear o permitir que un paquete continúe su camino). Todos los paquetes pasan a través de la tabla de filtros.


nat
  PREROUTING
  INPUT
  OUTPUT
  POSTROUTING
Esta tabla es la responsable de configurar las reglas de reescritura de direcciones o de puertos de los paquetes. El primer paquete en cualquier conexión pasa a través de esta tabla; los veredictos determinan cómo van a reescribirse todos los paquetes de esa conexión. 
Solo consultada en nuevas conexiones, luego todos los paquetes de la sesión se tratarán igual.


mangle
  PREROUTING (aqui solo veo paquetes desde fuera hacia dentro)
  INPUT
  FORWARD
  OUTPUT
  POSTROUTING
Esta tabla es la responsable de ajustar las opciones de los paquetes, como por ejemplo la calidad de servicio. Todos los paquetes pasan por esta tabla. Debido a que está diseñada para efectos avanzados, contiene todas las cadenas predefinidas posibles


raw
  PREROUTING
  OUTPUT

