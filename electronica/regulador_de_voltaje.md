# Regulador DC-DC
Input: 6-38
Output: 1.25-36
https://www.ebay.com/itm/DC-Step-Down-Voltage-Constant-Current-Buck-Regulator-Battery-Charger-LED-Driver/191902394789

# NCP1117
El NodeMCU usa un NCP1117 (exactamente el NCP1117ST33T3G) para bajar de 4.75-10V a 3.3V estables.

Hay otros modelos que pueden bajar a otras tensiones. Cuanta más baja la tensión final, más baja debe ser la de entrada.


# LM78XX / LM79xx
https://www.sparkfun.com/datasheets/Components/LM7805.pdf

Familia LM78xx, donde “xx” es el voltaje de la salida. Estos son 5, 6, 8, 9, 10, 12, 15, 18 y 24V, entregando una corriente máxima de 1A y soporta consumos pico de hasta 2.2A
Poseen protección contra sobrecargas térmicas y contra cortocircuitos, que desconectan el regulador en caso de que su temperatura de juntura supere los 125°C.

Se necesita un margen de 3V más en Vin que Vout (si queremos 6V a la salida necesitaremos 9V a la entrada).
Se disipa potencia en forma de calor para lograr la reducción de voltaje.

La familia LM79xx son para voltajes equivalentes pero con salida negativa

La familia LM7XLxx son para intensidad máxima de 100mA (capsula TO-92)

Los que van con cápsula TO-3 aguantan hasta 5A

Sufijos:
AC -> +-5%
C -> +-10%

# Diodo zener
Para fijar una tensión.
Pondremos la carga en paralelo con el zenner.
