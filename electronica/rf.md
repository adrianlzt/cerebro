# CCXXXX
http://www.ti.com/product/CC115L

The CC115L value line transmitter together with the CC113L value line receiver enables a low cost RF link.
Usado en un interruptor sin bateria: https://acegoo.myshopify.com/products/acegoo-wireless-lights-switch-kit-self-powered-battery-free-transmitter-with-receiver-remote-control-house-lighting-appliances-switch-receiver-included

Si queremos emisor/receptor: http://www.ti.com/product/CC1101
CC1101 is a low-cost sub-1 GHz transceiver designed for very low-power wireless applications. The circuit is mainly intended for the ISM (Industrial, Scientific and Medical) and SRD (Short Range Device) frequency bands at 315, 433, 868, and 915 MHz, but can easily be programmed for operation at other frequencies in the 300-348 MHz, 387-464 MHz and 779-928 MHz bands.

Comprar: https://www.rs-particuliers.com/WebCatalog/%C3%89metteur_recepteur_RF_CC1101RGP__ASK__FSK__GFSK__MSK__OOK__QFN_20_broches_Triple_Band-8203068.aspx
10€ 2 piezas

Parece que comprar el chip solo es complicado de usar. Lo mejor sería con una placa donde venga ya montado tipo:
http://www.electrodragon.com/product/cc1101si4463-wireless-module-uart/


## Calculadora para configurar parametros
Windows
http://www.ti.com/tool/smartrftm-studio


## Arduino
http://www.electrodragon.com/w/CC1101
http://labalec.fr/erwan/?p=497

## ESP8266
Lib en c
https://github.com/kissste/ESP8266-Arduino-CC1101

Ejemplo en lua usando el CC1101:
http://www.esp8266.com/viewtopic.php?p=8959


## Micropython
Habrá que usar directamente SPI



# nRF24L01+
The Nordic nRF24L01+ is a highly integrated, ultra low power (ULP) 2Mbps RF transceiver IC for the 2.4GHz ISM (Industrial, Scientific and Medical) band.

Con driver para micropython
http://wiki.micropython.org/Home
https://github.com/micropython/micropython/tree/master/drivers/nrf24l01

Y lib para intercambiar objetos python
https://github.com/peterhinch/micropython-radio



# radino
Placas con chips de radio frecuencia montadas para usar con arduino
http://shop.in-circuit.de/index.php?cPath=22


# Notas
433MHz band is better suited for long ranges than 2.4GHz, but all the ISM (Industrial, Scientific and Medical) bands suffer from potential interference from other users. There are also rules on how you are supposed to use the 433MHz band: you're not supposed to transmit continuously for long periods. I can't recall if these rules have legal force or are merely conventions.

AT Commands are a lot simpler that programming the CC1101 via SPI.

