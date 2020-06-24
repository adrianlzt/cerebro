# Glosario
DoD: depth of discharge, porcentaje de descarga de una batería en porcentaje
SoC: state of charge, porcentaje de carga de la batería



# Tipos de batería
Gel vs AGM: https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTM5ctAM0yeLXoWVUSpL8COc8TIjjyVC1oSBzu9VBg9Gsxhpio6&usqp=CAU



# Carga
Para Gel y AGM parece que recomiendan 18h para una carga total

https://www.victronenergy.com/upload/documents/Datasheet-GEL-and-AGM-Batteries-EN.pdf
Aqui hablan de que Victron usa un esquema de carga en 4 fases mejorando el típico de 3 fases.



# Capacidad
Las capacidad de las baterias se da en amperios-hora a una tasa de descarga determinada.
A mayor tasa de descarga, menor capacidad.

Ejemplo:
80Ah C20 -> nos ofrece 80Ah si la descargamos en 20h

## Medir capacidad con voltaje
CUIDADO! Algunas gráficas miden voltaje bajo carga y otras en descanso (tras 12-24h a 25ºC)

https://marinehowto.com/under-load-battery-voltage-vs-soc/
https://batteryuniversity.com/learn/article/how_to_measure_state_of_charge

Normalmente se usan las gráficas, o tablas, "Voltage to SoC".
Estas tablas deberían venir del fabricante o de pruebas nuestras ya que cada batería es distinta.


Medir el voltaje lo más cerca posible de la batería


### Gel
https://www.trojanbattery.com/pdf/Trojan_QSG_Gel.pdf
100% - 12.84v
75%  - 12.66v
50%  - 12.36v
25%  - 12.00v


### AGM
https://www.aussiebatteries.com.au/blog/how-to-troubleshoot-deep-cycle-battery-issues/
100% - 13.00v
75%  - 12.40v
50%  - 12.05v
25%  - 11.73v



# Descarga
Cuanto menos descarga realizemos más vida tendrá la batería.
Ejemplo de gráfica "Cycle Life in Relation to Depth of Discharge" para una batería gel UCG de UltraCell
https://i.imgur.com/lwEEqKh.png

Gráfico de DoD para baterías plomo-ácido
https://www.off-grid-europe.com/media/wysiwyg/tutorial_images/DODdischargeVoltageLoad_logo_OGE.png

Según entiendo de ese gráfico, cuanto mayor sea la tasa de descarga, el mismo voltaje indicará DoD distintas.

Para AGM paree que no recomiendan bajar del 50%, aunque se puede bajar hasta 80% sin matar la batería (https://discoverbattery.com/battery-101/discharging)



# Conectores
Conectores Fn de Ultracell https://ultracell.co.uk/www.ultracell.co.uk/downloads/terminal-list.pdf



# Baterias en paralelo
Dichero por Lulukabaraka, distribuidor de Ultracell en España:

No es un problema colocar las baterías en paralelo.
Lo que no puedes o no deberías hacer, es colocar en paralelo baterías de distintas edades, ejemplo, una batería de 5 años con una de nueva.
Cuando una de las 2 baterías llega a su vida útil, arrastra la otra, de modo que si la de 5 años dura 1 año mas, la batería nueva solo te va durar un año
Si pones las 2 baterías nuevas en paralelo o de fecha similar, no hay problema.
También tiene que ser del mismo tipo, pueden ser de distinto amperaje, pero tiene que ser del mismo tipo (AGM, GEL, Acido…)


direct-batteries.fr
También me han dicho que se pueden configurar las baterías en paralelo.
