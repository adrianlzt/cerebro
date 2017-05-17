http://1wt.eu/articles/2006_lb/


The ability to maintain unaffected service during any predefined number of simultaneous failures is called "high availability"
"Load balancing" is the ability to make several servers participate in the same service and do the same work

## Load Balancing ##

# DNS
Multiples entradas para el mismo host. Se suele usar como solución complementaria
Problemas:
  Si un servidor cae, a quien el round robin de dns de esa ip no podrá acceder
  Conexiones consecutivas en distintos hosts. No tiene que importar la falta de contexto (sesión)
  https://kubernetes.io/docs/concepts/services-networking/service/#why-not-use-round-robin-dns (apps que cachean las respuestas DNS)

Ejemplos:
  El buscador google puede usarlo sin problemas, no necesita sesión
  Facebook no puede usarlo, necesita sesión


# Load Balancer
Metemos un equipo en medio para repartir las conexiones entre varios servidores. Y otro equipo a modo de backup de este.

  Direct routing: trabaja a nivel 2. Todos los equipos de backend comparten la misma ip de servicio.
  El balanceador pasa los paquetes a los diferentes equipos de backend, y estos contestan directamente al cliente.
  Util en sitios con mucho tráfico, ya que este procesamiento es mínimo.
  Se necesita conocimiento TCP/IP para configurarlo correctamente

  Tunneling: como el direct routing, pero conectando el balanceador con los hosts mediante túneles

  IP address translation (NAT): el cliente se conecta al balanceador, y este traduce la ip a uno de los backend.
  Hay que tener cuidado de que el servidor no conteste nada con su ip, ya que no será accesible por el cliente.
  El balanceador tendrá que realizar más trabajo, manteniendo una tabla de sesión.
  Timeouts de sesión cortos pueden provocar ACK storms.
  Incrementar dichos timeouts puede saturar las tablas de sesión.
  Ejemplo: VIP con iptables

También tenemos los balanceadores por software, que actuan como reverse proxy. Estos actuan como si fuesen el servidor, y reenvian el tráfico a los backend.
Pueden servir como medio de seguridad, al solo forwardear lo que entienden, por ello suelen tener capacidad de filtrar por URL.
Necesitan bastante capacidad de cómputo.

Health Check
Son los encargados de decidir si un servidor se encuentra disponible para enviarle tráfico.
Es complicado decidir esto, ya que puede que el ping sea correcto, pero no acepte TCP. O acepte TCP, pero no HTTP. O que acepte HTTP en ciertas URLs pero no en otras
Se suele crear un request especial para comprobar el estado del servidor, pero hay que tener cuidado de no saturarlo con esta request, pues puede ser pesada.

Eligiendo a quien balancear
Varias opciones:
  Primero en contestar: puede provocar balanceo siempre al mismo nodo porque está más cerca y contesta antes
  Menos cargado: no válido en nodos que pueden ver variada su carga mucho en pocos segundos
  Roundrobin: cargará igual un servidor potente que uno menos potente
  Weighted roundrobin: damos pesos a los servidores para cargar más el más potente

Todos estos presentan el problema de romper sesiones establecidas, ya que dos peticiones consecutivas del mismo usuario se enviarán a dos servidores disintos.
Esto puede obligar a recalcular sesiones SSL continuamente, lo que tiene un coste alto de computación.

Address-hashing
La ip se divide entre el número de servidores, y la petición se envía al servidor que sea igual al resto de la división.
Válido mientras no cambie el número de servidores (al menos no cambie mucho) y la ip origen se mantena constante (no válido para clientes através de una granja proxy, estos usuarios pueden representar entre el 5% y el 10%)
En pequeñas intranets podría darse el caso de que no se distribuyese correctamente el tráfico (siempre saliese elegido el mismo backend)

Persistencia. Mantener la sesión

 Solución simple, que una vez llegado al backend este envie un 302 (redirección) a la ip del backend. Así el cliente conectará automáticamente.
 El problema es que si el servidor cae, el cliente seguirá intentando conectarse a dicho servidor.
 Válido para sitios grandes donde se puede asegurar que el servidor se mantendrá activo.

 Otra solución es que el balanceador recuerde las sesiones, pero seguimos con el problema de usuarios con ips origen distintas.

 Cookies!
 El balanceador sabe a quien balancear mirando la cookie (la variable SESSION, o alguna asi)
 El balancedor puede llenar su memoria con tanta cookie, pero si borra rápido, se pierden las sesiones.
 Si el balanceador cae y lo sustituye su backup, se pierden las sesiones. Tampoco se pueden usar balanceadores activo-activo (excepto que compartan la información, algo complejo)
 Mezclar cookie con address-hasing soluciona casi todos los problemas (excepto caídas del balanceador junto con usuarios que cambian su ip)

 Cookie insertion. El servidor inserta una nueva con su nombre. De esta manera el balanceador sabe a quien tiene que balancear sin tener que guarda nada en memoria
 También se puede hacer cookie modification.
 Más carga al balanceador, que además debe ser inteligente para procesar el protocolo HTTP.
 Problemas con los front cache, que podrían cachear una respuesta y enviar a todos los usuarios al mismo server.

