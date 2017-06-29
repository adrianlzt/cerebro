perf report --stdout
  nos saca un reporte por stdout con el porcentaje ocupado por cada llamada.
  El porcentaje indica el número de llamadas a cada función respecto al total


# Annotate
Mostrar el codigo fuente y las llamadas (en ensamblador) que llevan más tiempo.
Si el ejecutable tiene debug symbols se mostrará el código fuente + el ensamblador, si no, solo el ensamblador.
