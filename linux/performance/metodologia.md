Las aconsejables por Brendan Gregg:

## Drill-down analysis method (se basa en que las mayores mejoras podemos hacerlas en los niveles más altos):
  1.- Empezar en el nivel más alto
  2.- Examinar los detalles del siguiente nivel
  3.- Elegir la mejora más interesante
  4.- Si no consigues resolverlo, volver al punto 2


## USE method:
  Para cada recurso chequear:
    1.- Utilización: tiempo que el recurso estaba ocupado o porcentage de uso
    2.- Saturación: porcentaje de trabajo encolado
    3.- Errores

     Cola      ______________
-------------> |             |
               | Utilización |
     Erroes    |             |
<------------- --------------

La idea es ir rellenando una plantilla con cada uno de los elementos.

HW resources:
  CPUs
  Main memory
  Network interfaces
  Storage devices
  Controllers
  Interconnects

Para cada recurso nos da las herramientas para analizar los 3 puntos
http://www.brendangregg.com/USEmethod/use-linux.html

