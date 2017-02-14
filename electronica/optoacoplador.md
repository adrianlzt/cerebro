El más sencillo
http://www.electrodragon.com/w/images/1/1e/PC817.pdf
http://www.electrodragon.com/product/sharp-pc817-optoisolator-optocoupler-dip-4/



http://pdf1.alldatasheet.com/datasheet-pdf/view/26143/VISHAY/4N35.html
http://www.martyncurrey.com/activating-the-shutter-release/

Uno de sus usos es como un rele para baja intensidad.



http://wiring.org.co/learning/basics/optocoupler4n35.html

Con las pruebas que he hecho yo veo que entre los pines 4 y 5 se ve unas resistencia e 300Ohm

Hay relacion entre la intensidad del led y la corriente de emisor.
Pero parece que vale igualmente como switch.


Para calcular la resistencia de entrada (del led) tenemos que conocer, del datasheet, el voltaje del led (1.3v typ fwd voltage) y su intensidad 10mA (typ reverse current)

(Vcc-1.3)/0.01A = Resistencia


El circuito que conectemos a la salida tiene que cumplir la polaridad el transistor de salida.
