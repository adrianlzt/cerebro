<https://brturn.github.io/feeds-and-speeds/>
En freecad hay un plugin que integra esa calculadora.
Creo que la velocidad de avance horizontal que da es la máxima teórica posible.

Para ir sobre seguro normalmente se suelen usar RPMs y velocidades de avance horizontal más bajas.
Es importante poner el chipload para que haga una buena medición.

<https://www.ns-tool.com/en/technology/technical_data/cutting_speed/>
<https://tormach.com/articles/definitive-guide-to-feeds-and-speeds-for-wood>

Tenemos que dar la velocidad de giro del taladro (spindle speed), la velocidad de anvance horizontal (feed rate) y la velocidad de avance vertical (plunge rate/vertical feed).

The formula for spindle speed (N) in RPM is:
N = (CS x 1000) / (π x D)
Where:
CS = Cutting speed in m/min
D = Drill diameter in mm

Web donde venden brocas de madera.
<https://idcwoodcraft.com/collections/ball-nose>

Materiales, velocidades de perfilado, vaciado y taladrado:
<https://github.com/knipknap/better-tool-library/blob/main/btl/feeds/material.py>

Velocidad cortes madera:
<https://www.researchgate.net/figure/Recommended-cutting-speed-for-various-materials_tbl3_345430498>

En la formación de FabLab ponen entre 300 y 500 mm/min

```
N=1000*Vc/(π*D)
```

Vc=velocidad de corte
D=diametro de la broca en mm
Para una broca de 6mm saldría: 16000 - 26000 RPM
Para una broca de 3mm saldría: 32000 - 53000 RPM

Feed rate (mm/diente) para madera según el diámetro:
| Diámetro (mm) | Feed rate, Fz (mm/diente)| Plunge rate |
|--------------- | --------------- | --------------- |
| 1-1.5 | 0.02 | 1xD |
| 2-2.5 | 0.03 | 1xD |
| 3-3.5 | 0.03-0.06 | 1.5xD |
| 4 | 0.04-0.08 | 1.5xD |
| 5 | 0.05-0.12 | 1.5-2xD |
| 6 | 0.06-0.14 | 1.5-2xD |
| 8 | 0.08-0.18 | 1.5-2xD |
| 10 | 0.08-0.24 | 1.5-2xD |
| 12 | 0.08-0.3 | 1.5-2xD |

Velocidad de avance (feed rate, mm/min).
Z: número de dientes de la broca.
Vf = N _Fz_ Z

## Chipload

Table of chiploads for different materials (mm):
| Material | 3mm | 6mm | 8mm |
|----------|-----|-----|-----|
| MDF | 0.05 | 0.08 | 0.1 |
| Softwood / plywood | 0.035 | 0.07 | 0.09 |
| Hardwood | 0.03 | 0.06 | 0.08 |

# Ejemplos

Para hacer la multipresa de madera (hard wood) usé broca de dos dientes de 8mm. 15600RPPM, feed 1687mm/min y stepdown 6mm.
