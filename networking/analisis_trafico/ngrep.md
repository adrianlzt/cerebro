http://ngrep.sourceforge.net/

ngrep strives to provide most of GNU grep's common features, applying them to the network layer. ngrep is a pcap-aware tool that will allow you to specify extended regular or hexadecimal expressions to match against data payloads of packets.


# Instalación

## RHEL/Centos
En EPEL

## Arch
sudo pacman -S ngrep

# Uso
http://ngrep.sourceforge.net/usage.html

## Basico
ngrep port 80

-q si no queremos que muestre los "#" para el tráfico que está viendo pero no matcheando.

-A n
  mostrar los n siguientes paquetes
  no hay -B

-n n
  matchear n paquetes, luego salir.


Escuchar en todas las interfaces:
ngrep -d any port 22

## Buscar
Buscar alguna palabra:
ngrep 'palabra|o_esta' port 80

Buscar una palabra concreta
-w palabra

Buscar una cadena hexadecimal
-X 0x45723cb457af

Mostrar lo que no matchee
-v

No mostrar los # por cada paquete matcheado
-q

Mostrar fecha
-t

Si queremos poner un comando con un pipe después (por ejemplo: ngrep asd | grep xx) tendremos que activar el line buffer (si no esperará a tener 4096 bytes para pasarlo)
-l

dst HOST
src HOST
host HOST
gateway HOST
  paquetes que usan a este HOST como gateway
ether dst ETHER
ether src ETHER
ether host ETHER
dst port PORT
src port PORT
port PORT

not
and
or

## Mostrar
Para mostrar los cambios de línea correctamente
ngrep -W byline ...


Mostrar la diferencia de tiempo con el paquete anterior
-T

Mostrar el timestamp completo
-t

Mostrar en hexadecimal
-x



## PCAP
Guardar en fichero PCAP
-O fichero.cap

Leer de fichero PCAP
-I fichero.cap

Si queremos hacer un replay (ver como si fuese tráfico en tiempo real)
-D
