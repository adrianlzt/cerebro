https://osquery.io/

mirar tambien grr.md

osquery (http://osquery.io/) is a new open source tool from Facebook that exposes low level details of your system via a familiar SQL interface. Want to query for processes listening on a given network interface? Or for services that launch at startup? This is the tool for you.

c++, muchas dependencias

osquery> SELECT uid, name FROM listening_ports l, processes p WHERE l.pid=p.pid;

osqueryi, pregunta puntual
osqueryd, preguntas programadas
  daemon corriendo. Tambien puede subscribirse a eventos

La gran ganancia es que se han encargado de darnos una interfaz común para abstraernos de los comandos en particulares.

Se puede extender via API Thrift
Ejemplos para hacerlo con Go: https://github.com/kolide/osquery-go


# Install
## Arch
yay osquery-bin

systemctl status osqueryd


# Uso

## Socket
Si queremos atacar a osquery via socket podemos arrancar osqueryi como:
sudo osqueryi --extensions_socket /var/run/osqueryi.socket
