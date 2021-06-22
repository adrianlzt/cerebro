http://www.kimovil.com/

Comprobar si las bandas de red funcionan en nuestro pais
http://willmyphonework.net/
https://www.frequencycheck.com
http://blog.geekbuying.com/index.php/2016/06/02/how-to-know-if-the-phone-can-work-with-network-frequency-of-your-country/#prettyPhoto


Bandas 4G
http://www.xatakamovil.com/conectividad/si-vas-a-comprar-un-movil-chino-comprueba-antes-su-compatibilidad-con-el-4g-de-espana
B20 800Mhz
B3: 1800MHz
B7: 2600MHz
FDD



# 3g
RSSI: Received Signal Strength Indicator

WCDMA
RSSI: -102 / -105dBm -> Transferencia: 7Mbps, ping bastante alto y variable, entre 70ms y 1000ms, parece que se estabiliza en unos 300/400ms

RSSI: -113dBm -> sin señal
RSSI: -101dBm -> funciona, pero con bastantes cortes (día un poco nublado, mismo sitio otro día con 4g)


# 4g

RSRP: Reference Signal Received Power
RSRQ: Reference Signal Received Quality

Excelente:
RSRP >= -80dBm
RSRQ >= -10dB
SNR >= 20dB

Bien:
RSRP -80 / -90dBm
RSRQ -10 / -15dB
SNR 13 / 20dB

Medio:
RSRP -90 / -100dBm
RSRQ -15 / -20dB
SNR 0 / 13dB

Mal:
RSRP <= -100dBm
RSRQ <= -20dB
SNR <= 0dB


Medidas con Archer-MR200 y las mismas antenas conectadas por fuera con un cable de 2m

banda
Signal Strength: %
RSRP: dBm
RSRQ: dB
SNR: dB
temperatura ºC
humedad %
ping

banda 20
Signal Strength: 25%
RSRP: -119dBm
RSRQ: -14dB
SNR: -0.6dB
ping 20s, sin internet prácticamente

banda 20
Signal Strength: 50%
RSRP: -118dBm
RSRQ: -13dB
SNR: 5.8dB
ping 5s, inestable

banda 20
Signal Strength: 50%
RSRP: -117dBm / -118dBm
RSRQ: -11 / -12dB
SNR: 3.0 / 6.2dB
ping 100ms

banda 20
Signal Strength: 25%
RSRP: -122dBm
RSRQ: -13dB
SNR: 2.2 / 3.6dB
ping inestable, unos 100ms pero a veces se va hasta 5s o 20s

banda 20
Signal Strength: 50%
RSRP: -111 / -112dBm
RSRQ: -8 / -10dB
SNR: 7.8 / 12.4dB
ping avg 43ms


# Nuevas medidas 3g/4g con temperatura y humedad
ping 20 paquetes a 1.1.1.1

3G/4G
banda 
Signal Strength: %
RSRP: dBm
RSRQ: dB
SNR: dB
RSSI dBm
temperatura ºC
humedad %
antenas:
notas:
ping(min/avg/max/mdev/loss):

3G
banda 8
Signal Strength: 50%
RSRP: dBm
RSRQ: dB
SNR: dB
RSSI -103dBm
temperatura 11ºC
humedad 82%
antenas: 90º horizontal, parelas, 1m
notas:
ping(min/avg/max/mdev/loss): 116.131/145.966/239.830/33.092 ms, 0%

3G
banda 8
Signal Strength: 50%
RSRP: dBm
RSRQ: dB
SNR: dB
RSSI -103dBm
temperatura 11ºC
humedad 82%
antenas: 90º horizontal, parelas, 30cm
notas:
ping(min/avg/max/mdev/loss): 116.603/151.767/224.067/33.443 ms, 0%

3G
banda 8
Signal Strength: 50%
RSRP: dBm
RSRQ: dB
SNR: dB
RSSI -99dBm
temperatura 11ºC
humedad 82%
antenas: 45º horizontal, 90º entre ellas, 1m
notas:
ping(min/avg/max/mdev/loss): 116.683/120.820/136.889/4.057 ms / 0%

3G
banda 8
Signal Strength: 50%
RSRP: dBm
RSRQ: dB
SNR: dB
RSSI -99dBm
temperatura 11ºC
humedad 82%
antenas: A 90º horizontal, B 0º horizontal, 1.8m
notas:
ping(min/avg/max/mdev/loss): 118.107/145.061/228.264/30.829 ms / 0%

3G
banda 8
Signal Strength: 75%
RSSI -97/-99dBm
temperatura 23.6ºC
humedad 40.8%
antenas: verticales
notas: buena conexión, estable
ping(min/avg/max/mdev/loss): 115.818/194.043/555.733/121.966 ms


Con esta señal (variando el RRSI entre -99 y -103) las llamadas por meet a veces van perfectas y otras veces con mucho lag. Parece que esta cantidad de señal es bastante límite

4G
banda 20 (800mhz)
Signal Strength: 50%
RSRP: -115dBm
RSRQ: -12dB
SNR: 7.0dB
temperatura 14.2ºC
humedad 73% (muy nublado, algunas gotas)
antenas: mimo nueva blanca enorme
notas: tarjeta movistar. ping malísimo, aunque varía, otras veces llega a bajar (algunos paquetes) hasta 50ms. Forzando a 3g (-100dBm) el ping sigue igual de malo
ping(min/avg/max/mdev/loss): 14510.084/17410.364/20094.380/1368.486 ms
con las antenas originales: 4g -120 / -13 / 4.0

3G
banda 8
Signal Strength: 75%
RSSI: -97dBm
temperatura 14.2ºC
humedad 73% (muy nublado, algunas gotas)
antenas: originales
notas: tarjeta Free. ping ~200ms. La tarjeta movistar era el problema???
ping(min/avg/max/mdev/loss): 119.776/153.157/322.757/48.027 ms

4G
banda 20
Signal Strength: 50%
RSRP: -118dBm
RSRQ: -12dB
SNR: 2.6dB
temperatura 16.5ºC
humedad 67%
antenas: originales
notas: cerca de la ciudad de cuenca
ping(min/avg/max/mdev/loss): 25.851/48.032/76.150/11.461 ms

4G
banda 20
Signal Strength: 50%
RSRP: -117dBm
RSRQ: -12dB
SNR: 2.2dB
temperatura 20.1ºC
humedad 55%
antenas: originales
notas: cerca de la ciudad de cuenca. Lag al trabajar con ssh
ping(min/avg/max/mdev/loss): 25.600/529.512/1489.253/510.441 ms


# Pruebas tras comprar un movil
antutu, comparar la puntuacion con la que dice kimovil

chequear pixels muertos (la app de antutu lo hace?

Comprobar cámaras. Enfocan correctamente?
