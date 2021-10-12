https://www.waveshare.com/w/upload/4/4a/GSM_GPRS_GNSS_HAT_User_Manual_EN.pdf
https://www.waveshare.com/w/upload/6/68/SIM868_Series_Hardware_Design_V1.06.pdf
  más datos, con tiempos, consumos, etc

# Conectar al pc
Poner el jumper en A (USB-SIM868)
Poner SIM.
Conectar con cable miniUSB
Mirar el dmesg, se habrá conectado a un /dev/ttyUSBX

PWR button pulsado durante un segundo.
Se enciente led STA y parpadea el NET cada segundo.
Tras unos segundos, NET empezará a parpadear cada 3", querrá decir que se ha logueado correctamente con la red.

Ahora podemos conectar a la consola:
screen /dev/ttyUSB1 115200
  darle unos segundos a que pueda conectar

No veremos nada.
Probar a escribir "ATI".
Deberemos tener echo (ver lo que escribimos).
Si funciona, a parte del eco, al dar al enter, veremos:

SIM868 R14.18

OK

+CPIN: READY

Call Ready

SMS Ready

Call Ready

Para comandos genéricos at mirar electronica/at_commands.md

Parece que cuando me desconecto se queda "tonto" y no me deja volver a conectar.

# Conectar Raspberry
Si queremos conectar el hat a una raspberry mediante el puerto serie (los pines), tendremos que cambiar los jumpers para
ponerlos en el modo B.

Recordar encender el HAT antes de intentar conectar (boton PWR durante 1")

Luego usaremos screen para conectar:
screen /dev/ttyS0 115200

Según el manual:
ttyS0 is the serial port of Pi 3B/3B+, ttyAMA0 of Pi 2B/Zero

Pero para la PiZeroW que utilizo el puerto es /dev/ttyS0

## Conectar con PPP
NOTA: si usamos PPP luego no podremos conectar con otro cliente al puerto serie para obtener, por ejemplo, datos de GPS.
https://www.waveshare.com/wiki/SIM868_PPP_Dail-up_Networking
apt-get install ppp
cp /etc/ppp/peers/provider /etc/ppp/peers/gprs
vi /etc/ppp/peers/gprs

Cambiar:
connect "/usr/sbin/chat -v -f /etc/chatscripts/gprs -T NOMBRE_APN"
/dev/ttyS0
nocrtscts
debug
nodetach
ipcp-accept-local
ipcp-accept-remote

Para conectar (se queda en foreground):
pppd call gprs

# AT
https://www.waveshare.com/w/upload/2/20/SIM800_Series_AT_Command_Manual_V1.09.pdf

## GNSS / GPS
https://www.waveshare.com/w/upload/3/3d/SIM868_GNSS_Application_Note_V1.00.pdf

Time-To-First-Fix
Cold starts : 28s (typ.)
Hot starts : < 1s
Warm starts: 26s

Colocar la antena GPS lo más lejos posible de otras antenas.

Usar la fecha de las torres movil (si no, no encuentra satélites) https://github.com/OH1KK/Waveshare-GPS/blob/master/gps.sh#L48
necesario?
AT+CLTS=1
AT&W
  esto último guarda

Tras esos comando, apagar y encender de nuevo.

Al volver a conectar, comprobar que la fecha es correcta:
AT+CCLK?
  la zona horaria va en franjas de 15', por lo tanto +08 es CEST (UTC+2)

AT+CGNSIPR?
  GPS baud rate

AT+CGNSPWR?
  estado GNSS (activado o no)

AT+CGNSPWR=1
  activar GNSS

AT+CGNSPWR=0
  desactivar GNSS

AT+CGNSAID=31,1,1
  cargar el fichero EPO

AT+CGPSSTATUS?
  GPS status

Cuando el GPS está funcionando se ve como parpadea el led PPS.
El led parpadea cuando la posición ha sido fijada


AT+CGNSINF
  GNSS navigation information parsed from NMEA sentences
  Cuando esta arrancando, la línea termina tipo:
  ,,,1,0,,,16,
  Ese 1 es el número de satelites que ve el módulo
  Con 6 satélites (4 en uso) y una C/N0 de 40 ya me encuentra la posición.

  La fecha parece que la coge cuando ve 4 satélites.

  Respuesta:
  +CGNSINF: <GNSS run status>,<Fix status>,<UTC date & Time>,<Latitude>,<Longitude>,<MSL Altitude>,<Speed Over Ground>,<Course Over Ground>,<Fix Mode>,<Reserved1>,<HDOP>,<PDOP>,<VDOP>,<Reserved2>,<GNSS Satellites in View>,<GNSS Satellites Used>,<GLONASS Satellites Used>,<Reserved3>,<C/N0 max>,<HPA>,<VPA>
     1  <GNSS run status>
     2  <Fix status>
     3  <UTC date & Time>
     4  <Latitude>
     5  <Longitude>
     6  <MSL Altitude>
     7  <Speed Over Ground>
     8  <Course Over Ground>
     9  <Fix Mode>
    10  <Reserved1>
    11  <HDOP>
    12  <PDOP>
    13  <VDOP>
    14  <Reserved2>
    15  <GNSS Satellites in View>
    16  <GNSS Satellites Used>
    17  <GLONASS Satellites Used>
    18  <Reserved3>
    19  <C/N0 max> (carrier-to-noise density, 37-45, creo que menos es mejor)
    20  <HPA>
    21  <VPA>

  Ejemplo de respuesta con datos:
  1,1,20161215045641.000,31.221303,121.355042,71.900,0.00,45.1,1,,1.0,1.3,0.8,,10,10,,,36,,



AT+CGNSURC=5
  reportar la info de CGNSINF cada 5s (podemos poner entre 1 y 255)
  a 0 desactiva
AT+CGNSURC=0

AT+CGNSSEQ="RMC"
  Define the last NMEA sentence that parsed

AT+CGNSTST=1
  enviar datos NMEA recibidos a la consola
AT+CGNSTST=0
  dejar enviar datos recibidos a la consola

  podemos parsearlos con http://freenmea.net/decoder
  Cada línea empieza por un código de dos letras con el sistema:
    GP: GPS
    GL: GLONASS
    GN: Global Navigation Satellite System (GNSS)

  Luego tres siglas indicando que se muestra:
    GGA - Fix information
    GSA - Overall Satellite data
    GSV - Detailed Satellite data
    RMC - recommended minimum data for gps
    VTG - Vector track an Speed over the Ground


Datos cuando no tenemos localización (antena conectada, no se porque no funciona)
$GNGGA,000000.094,,,,,0,0,,,M,,M,,*5B
$GPGSA,A,1,,,,,,,,,,,,,,,*1E
$GLGSA,A,1,,,,,,,,,,,,,,,*02
$GPGSV,1,1,00*79
$GLGSV,1,1,00*65
$GNRMC,000000.094,V,,,,,0.00,0.00,060180,,,N*51
$GNVTG,0.00,T,,M,0.00,N,0.00,K,N*2C

Parso del GNGGA
.                                                     11
        1         2      3 4        5 6 7  8   9   10 |  12 13  14   15
        |         |      | |        | | |  |   |   |  |  |  |   |    |
$--GGA,hhmmss.ss,llll.ll,a,yyyyy.yy,a,x,xx,x.x,x.x,M,x.x,M,x.x,xxxx*hh
 1) Time (UTC)
 2) Latitude
 3) N or S (North or South)
 4) Longitude
 5) E or W (East or West)
 6) GPS Quality Indicator,
 0 - fix not available,
 1 - GPS fix,
 2 - Differential GPS fix
 7) Number of satellites in view, 00 - 12
 8) Horizontal Dilution of precision
 9) Antenna Altitude above/below mean-sea-level (geoid)
10) Units of antenna altitude, meters
11) Geoidal separation, the difference between the WGS-84 earth ellipsoid and mean-sea-level (geoid), "-" means mean-sea-level below ellipsoid
12) Units of geoidal separation, meters
13) Age of differential GPS data, time in seconds since last SC104 type 1 or 9 update, null field when DGPS is not used
14) Differential reference station ID, 0000-1023
15) Checksum

$GNGGA,000000.094,,,,,0,0,,,M,,M,,*5B
Aqui podemos ver que no tenenmos posición ni satélites a la vista (0,0)
SIM800_Series_AT_Command_Manual_V1.09.pdf
AT+CIPGSMLOC=1,1
coordenadas de una antena para tener AGPS?
después de configurar eñ NTP si me contestó, pero con coordenadas 0,0, y la hora me la daba en UTC (aunque el CLK si me la devuelve bien)
+CIPGSMLOC: 0,0.000000,0.000000,2021/08/31,06:57:58


Definir a mano una posición
Give reference location to GNSS engine
AT+CRFLOC=40.1,2.7


### LSB
https://www.avnet.com/wps/wcm/connect/onesite/5ddc2831-b698-44ac-92f5-50d79a14cb3f/Heracles-SIMCOM_GSM+Location_Application+Note_V1.02.pdf?MOD=AJPERES&CVID=m31n15G&CVID=m31n15G&CVID=m31jwAj&CVID=m31jwAj

Esto parece que es una API donde se envía el:
  - mcc (Mobile Country Code)
  - mnc (Mobile Network Code)
  - info de una antena [lac (location area code) y cellID (cid)]
Nos devuelve una posición GPS.

Podemos ver el server configurado con
AT+CLBSCFG=0,3
Por defecto es:
+CLBSCFG: 0,3,"lbs-simcom.com:3002"

AT+CLBS=1,1
  obtener lat,lng de la antena. Si el primer dígito no es 0, es un error
  parece que el server de simcom no tiene info de las antenas de francia

Si quiero obtener el lac y el cid
AT+CREG=2
AT+CREG?
+CREG: 2,5,"1102","D63D"
Están en formato hexadecimal

Para obtener mcc, mnc, lac y cid:
AT+CENG=3,1
  activar modo ingenieria
AT+CENG?
  obtener los datos de las antenas cercanas
  <cell>,<mcc>,<mnc>,<lac>,<cellid>,<bsic>,<rxl>
  antena a donde estamos conectados
      +CENG: 0,"208,01,1102,d63d,27,31"
  otras antenas
      +CENG: 1,"208,01,1102,3ff3,63,30"
      +CENG: 2,"208,01,1102,013a,15,24"
AT+CENG=0,0
  desactivar modo ingenieria

Con esos datos podemos usar un servicio como https://unwiredlabs.com/dashboard?firstLogin=1#sandbox para obtener la posición de la antena.
Ejemplo de llamada:
{
    "token": "RELLENAR",
    "radio": "gsm",
    "mcc": 208,
    "mnc": 1,
    "cells": [{
        "lac": 4354,
        "cid": 24845
    }],
    "address": 1
}

## GPRS / internet
https://www.waveshare.com/w/upload/2/20/SIM800_Series_AT_Command_Manual_V1.09.pdf
En este manual están todos los comandos para IP, HTTP, FTP, etc

AT+CSQ
  calidad de la señal, máximo 31

AT+CREG?
  registrados en la red? el segundo param debe ser 1 (home network) o 5 (roaming)
  ejemplo de respuesta: +CREG: 0,5

AT+CGATT?
  comprobar estado GPRS, 1 attached

AT+CSTT?
  consultar APN
AT+CSTT="ORANGEWORLD","ORANGE","ORANGE"
  definir APN
  si no me deja setearlo, reiniciar y probar tras arrancar
AT+CSTT="TM","",""
  APN de thigsmobile

AT+CIICR
  Activar la conexión

AT+CIFSR
  obtener la IP

AT+CIPSTART="TCP","91.168.208.224","50001"

AT+CIPSTART="TCP","91.8.8.4","501"
  conexión TCP a esa IP:port

AT+CIPSEND
  abre prompt para enviar datos
  control+z para terminar

AT+CIPCLOSE
  para terminar la conex

### NTP + EPO
https://cdn-shop.adafruit.com/product-files/2637/SIM800+Series_NTP_Application+Note_V1.01.pdf
descripción de los comandos CNTP

https://www.waveshare.com/w/upload/b/b6/SIM868_GNSS_AGPS_Application.pdf
Página 7, estos comandos vienen de ahi
AT+SAPBR=3,1,"CONTYPE","GPRS"
AT+SAPBR=3,1,"APN","TM"
  pongo mi APN, que es "TM"
AT+SAPBR=1,1
AT+SAPBR=2,1
AT+CNTPCID=1
AT+CNTP?
  consultar server NTP
AT+CNTP=202.120.2.101,8
  configurar NTP con el server de por defecto y zona 8 (UTC+2, porque se pone en franjas de 15')
AT+CNTP
  sincronizar NTP
  1 es ok, los 6X errores
AT+CCLK?
  obtener hora

Esta secuencia de comandos ha funcionado y tengo la hora por NTP.
El led de NET parpaedea cada 500ms aprox, por lo que parece que mantiene una conex para tener la hora.

Fichero epo bajado de https://choaristudio.com/agps/agps/
Dejado también en electronica/raspberry_pi/MTK3.EPO
Subido a este server ftp que permite dejar ficheros 30min

AT+FTPSERV="ftp.dlptest.com"
AT+FTPUN="dlpuser"
AT+FTPPW="rNrKYTX9g7z3RgJRmxWuGHbeu"
AT+FTPGETNAME="MTK3.EPO"
AT+FTPGETPATH="/"
AT+FTPEXTGET=1
  esperar a que conteste +FTPEXTGET: 1,0
AT+FTPEXTGET=4,"epo"
AT+FSLS=C:\User\
  deberemos ver el fichero "epo"

AT+CGNSCHK=3,1
  validación fichero

AT+CGNSPWR=1
  encender GPS

AT+CGNSAID=31,1,1
 subir fichero epo
 esperar hasta +CGNSAID: OK

AT+CGNSINF
  obtener info GNSS

Tras todo esto (NTP + EPO), la info GNSS me da la fecha correcta, pero sigo sin tener ubicación.
Probar a alimentar con un cargador USB.
Todo esto lo estaba haciendo con la batería externa de xiaomi




## Navegar por el sistema de ficheros
AT+FSLS=C:\User\
  esto es un LS


## Energía
Mirar AT+CFUN=[0-4]
