https://collectd.org/wiki/index.php/Plugin:Write_Graphite

Configuración (en caso de varias opciones, pongo primero el valor por defecto):

LoadPlugin write_graphite

<Plugin write_graphite>
  <Carbon>
    Host "172.17.0.2"
    Port "2003"
    #Protocol [tcp|udp] # tcp es eficiente, mantiene socket abierto
                        # puede que no tenga abierto udp en el carbon
			# definir alguno
    #LogSendErrors [true|false] # Loguea errores en la conex con graphite
    Prefix "collectd" # cadena que se antepone al hostname
    #Postfix "collectd" # cadena que se pone al final
    #StoreRates [true|false] # enviar el rate calculado o el valor total
    #SeparateInstances [false|true] # separar por puntos la instancia, tipo, etc
    #AlwaysAppendDS [false|true] # append el nombre del data source
    EscapeCharacter "_" # con que caracter cambiamos los '.', ' ' y special chars
  </Carbon>
</Plugin>


Otra opción para enviar a graphite:

Collectd puede enviar métricas a otro collectd que hará de collector.

Es mejor opción poner un collectd al lado de graphite y enviar las métricas así?
Más eficiente en términos de red?
Perdemos la posibilidad de escalar horizontalmente?


<Plugin network>
  Server "<your-docker-host>" "<the-collectd-port-likely-49153>"
</Plugin network>



En Evernote usan un "graphite relay" que actua como un load balancer ante un cluster de graphites.
https://blog.evernote.com/tech/2013/07/29/graphite-at-evernote/

