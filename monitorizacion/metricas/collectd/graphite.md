https://collectd.org/wiki/index.php/Plugin:Write_Graphite

Configuración (en caso de varias opciones, pongo primero el valor por defecto):

LoadPlugin write_graphite

<Plugin write_graphite>
  <Carbon>
    Host "172.17.0.2"
    Port "2003"
    #Protocol [tcp|udp] # tcp es eficiente, mantiene socket abierto
    #LogSendErrors [true|false] # Loguea errores en la conex con graphite
    Prefix "collectd" # cadena que se antepone al hostname
    #Postfix "collectd" # cadena que se pone al final
    #StoreRates [true|false] # enviar el rate calculado o el valor total
    #SeparateInstances [false|true] # separar por puntos la instancia, tipo, etc
    #AlwaysAppendDS [false|true] # append el nombre del data source
    EscapeCharacter "_" # con que caracter cambiamos los '.', ' ' y special chars
  </Carbon>
</Plugin>

