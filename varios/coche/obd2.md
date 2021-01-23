# ODB-II
https://www.outilsobdfacile.com/obd-presentation.php#mode
Buena explicación con un gráfico de que estándares aplican al hardware y cuales al software.
Muestra los diferentes protocolos que se pueden usar para obtener la información de OBD2


Estandar que especifica el tipo de conector y el pinout de este.
https://en.wikipedia.org/wiki/On-board_diagnostics#OBD-II_diagnostic_connector

En este conector encontramos pines para acceder a la información del vehículo usando distintas interfaces.

Pines 2,10: SAE J1850 PWM y VPW
Pines 6,15: CANbus (ISO 15765-4, SAE J2284)
Pines 7,15: K-line, L-line (ISO 9141-2, ISO 14230-4)

Parece que cada fabricante expone la info de OBD2 por el protocolo que le parece.
https://obd2-elm327.es/protocolos-conexion-obd2

Tiene pinta que los modernos ya usan todos CANbus
Parece que como exponer OBD via CAN lo detalla la ISO ISO 15765-4:2016 (https://www.iso.org/obp/ui/#iso:std:iso:15765:-4:ed-3:v1:en)
copia en iso_15765-4.pdf
DoCAN (Diagnostic communication over Controller Area Network)

https://en.wikipedia.org/wiki/OBD-II_PIDs
Diferentes estándares definen que PIDs deben ir siempre en los coches y que significan
No todos los coches tienen todos los PIDs


https://www.outilsobdfacile.com/obd-presentation.php#mode
OBD2 define 10 modos/services de diagnóstico (da igual que procolo estemos usando por debajo).
No todas las ECU-ECM soportan todos los modos.
En cada modo retorna ciertos valores.

Modo/Service 1: valores comunes (RPM, speed, temperature)
Modo/Service 2: freeze frame de cuando ocurrió un DTC (fallo motor). Mismos valores que en 1, pero congelados en ese instante
Modo/Service 3: para obtener los códigos de error (DTC)
Modo/Service 4: borrar códigos de error (DTC)
Modo/Service 5: resultados del self-diagnóstico para los sensores de oxígeno/lambda (viejo, para coches con canbus se usa el mode6 para esto)
Modo/Service 6: resultados de self-diagnóstico para cosas que no están en constante vigilancia
Modo/Service 7: DTCs no confirmados (los DTC aparecen en mode3 cuando ocurren al menos durante un tiempo)
Modo/Service 8: resultados de self-diagnóstico para otras cosas (parece que no se usa en europa)
Modo/Service 9: información del vehículo (VIN, calibration rules, etc)
Modo/Service 10 (o A): DTCs permanentes. Solo se podrán borrar circulando varias veces sin que la ECU detecte el fallo

Protocolos usados por OBD2
https://www.sae.org/standards/content/j1979_201702/
  especificados que estandar se usa para cada capa OSI
https://www.sae.org/standards/content/j1979da_201905/


## Sesiones
Parece que el protocolo OBD2 tiene el concepto de sesiones, por lo que un comando aislado puede significar cosas distintas según en la sesión que estemos
https://www.iso.org/standard/45763.html


## Respuestas
Cuando enviamos un comando a OBD2 puede devolvernos una respuesta positiva o negativa

Por ejemplo, si preguntamos:
18 02 FF FF (primer byte es el ServiceID, SID)

Una respuesta correcta sería:
58 01 FF 01 08 (el primer byte es SID+0x40)

Una respuesta errónea:
7F 18 33 (Error, SID, response code)


Este por ejemplo es el error de pid que no existe:
7F 01 12

Este sería que la función "2F" (lo que pedimos) no está soportado en la sesión activa
7F 2F 7F


Errores
https://automotive.wiki/index.php/ISO_14229

http://opengarages.org/handbook/ebook/
  Table 4-3: Common UDS Error Responses

http://www.emotive.de/documents/WebcastsProtected/Transport-Diagnoseprotokolle.pdf
  página 21

https://blog.perquin.com/prj/obdii/
Errores que puede devolver y descripción detallada de como funciona (pero con protocolo antiguo KLine)




# Apps

Específicas de Fiat en fiat.md

## Torque
App para android que nos permite extraer info.
Tiene plugins para determinadas marcas que nos dan más información.
Plugins y versión pro de pago (barato)

Se usa con dongles OBD2 - bluetooth


## scantool
https://github.com/kees/scantool
port a linux de scantool.net



# ELM327
https://en.wikipedia.org/wiki/ELM327

PIC con código privado para hablar con el protocolo OBD usando los protocolos:
  SAE J1850 PWM (41.6 kbit/s)
  SAE J1850 VPW (10.4 kbit/s)
  ISO 9141-2 (5 baud init, 10.4 kbit/s)
  ISO 14230-4 KWP (5 baud init, 10.4 kbit/s)
  ISO 14230-4 KWP (fast init, 10.4 kbit/s)
  ISO 15765-4 CAN (11 bit ID, 500 kbit/s)
  ISO 15765-4 CAN (29 bit ID, 500 kbit/s)
  ISO 15765-4 CAN (11 bit ID, 250 kbit/s)
  ISO 15765-4 CAN (29 bit ID, 250 kbit/s)
  SAE J1939 (250kbit/s)
  SAE J1939 (500kbit/s)

Para hablar con ELM327 se usan comandos AT
https://www.elmelectronics.com/wp-content/uploads/2020/05/AT_Command_Table.pdf

Explicaciones de los comandos:
https://www.elmelectronics.com/wp-content/uploads/2017/01/ELM327DS.pdf
copia en este dir

Every ELM327 chip is factory programmed to operate at a serial setting of 38400 baud/s, 8 data bits, no parity, 1 stopbit.


## CANbus
Se puede usar el ELM327 para hablar con el CANbus, pero no es full duplex y se satura rápido (BUFFER FULL)
https://github.com/norly/elmcan

Parece que si se usa para mandar ciertos comandos. Visto en una web que hablablan que el DataPlug de VW envía directamente comandos al canbus.


## Puerto serie
No probado, visto en https://github.com/norly/elmcan
sudo ldattach \
       --debug \
       --speed 38400 \
       --eightbits \
       --noparity \
       --onestopbit \
       --iflag -ICRNL,INLCR,-IXOFF \
       29 \
       /dev/ttyUSB0

AT E1
  echo on

AT L1
AT I
AT @1
AT DP
AT RV
  voltaje
ATWS
  version

Como pedirle el mode 9?


Otra opción:
screen /dev/ttyUSB0 38400


## Python OBD
https://github.com/brendan-w/python-OBD

import obd
c = obd.OBD()  # detecta automaticamente el dispositivo USB
c.query(obd.commands.SPEED).value
<Quantity(12.0, 'kph')>


## Emulador de ELM327
https://github.com/Ircama/ELM327-emulator
pipenv shell
pipenv install obd pyyaml
python -m elm

log debug en: elm.log


En otra terminal:
minicom --device /dev/pts/118
Para activar el echo:
C^a E
 (si estamos en tmux, dos veces C^a C^a)

ATZ
  nos devuelve la versión del ELM327
ATRV
  voltaje
010D
  pedimos service=1, PID=0D, que es la velocidad del vehículo.
  no podemos escribirlo, no son los caracteres "0" "1", etc, es el valor 0x010D

Una respuesta para ese código de velocidad podría ser:
7E8 03 41 0D 18
7EA 03 41 0D 18
0x18 = 24 km/h sería la velocidad

engine speed: 010D
response:
7E8 04 41 0C 0B 00
7EA 04 41 0C 0B 00
0x0B = 11, 0x90 = 144
Usando la formula para este PID (viene en la wikipedia)
(256*11+144)/256 = 740RPM


Atacando al emulador con python-odb
import obd
c = obd.OBD(portstr="/dev/pts/118")
c.query(obd.commands.SPEED).value
<Quantity(12.0, 'kph')>



## Wireshark
Si estamos conectados con algún programa al ELM327, podemos esnifar el tráfico con wireshark

Filtro a usar (el protocolo usado y quitar paquetes vacios):
ftdift && (len(ftdift.if_a_rx_payload) > 0 || usb.src == "host")


Si estamos viendo el tráfico OBD2 sobre canbus podemos usar el dissector de OBD2
https://github.com/wireshark/wireshark/blob/40eece98f8e6bc9a0a8f0961e43e95f538322aec/epan/dissectors/packet-obd-ii.c
