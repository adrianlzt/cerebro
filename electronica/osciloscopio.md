Mirar también redpitaya.md

# Hantek_6022BE

Osciloscopio que se puede conectar vía USB y funciona con Linux.

[Manual](https://www.sigmaelectronica.net/manuals/Hantek6022BE_Manual.pdf)

<https://sigrok.org/wiki/Hantek_6022BE>

Parece que solo es necesario conectar el cable usb negro (el otro no he mirado para que es).

Gain range: 10mV - 5V (9 steps).
Si queremos medir más voltaje, configurar la sonda en modo 10x, lo que reducirá el voltaje.

Por ejemlo, si queremos medir algo de 12v, ponemos la sonda a 10x y en el software veremos 1.2v.

# Sigrok

Programa para manejar dispositivos de medición. De facto en linux

Pulseview, interfaz gráfica para sigrok, muy básica.
<https://sigrok.org/doc/pulseview/unstable/manual.html>

Click sobre el canal para configurar más opciones.

Lo que nos permite es grabar la señal durante un tiempo (n número de muestras a una frecuencia determinada).
Por ejemlo, tomar 10M muestras a 1MHz (10s de grabación).

One of Sigrok's strengths is its ability to decode various digital protocols (I2C, SPI, UART, etc.). If your signal involves a known protocol, you can select the appropriate decoder plugin in PulseView to decode the data and display the decoded information

Convertir entre formatos:

```bash
sigrok-cli -i laptop.sr -O csv -o laptop.csv
```

# OpenHantek

AUR/openhantek6022-git

<https://github.com/OpenHantek/openhantek>

La interfaz gráfica es más completa que la de Pulseview.
Se parece más a los osciloscopios físicos que he usado.
