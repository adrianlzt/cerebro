Si una regla coge el paquete, no se miran el resto de reglas con menor prioridad.

Si queremos meter una regla en una determinada posición:
iptables -t nat -I OUTPUT 1 ...

-I chain number
  insertar en una determinada posición
