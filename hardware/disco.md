ZCAV (zoned constant angular velocity): los anillos más externos del disco tiene más almacenamiento (por tener más perímetro)
Para una velocidad rotacional constante, los anillos externos leen más datos (más velocidad)
El comando zcav (parte del paquete bonnie++) nos hará benchmarks para medir este efecto.
Mirar linux/performance/zcav.md


Interconexión de bus:
  el kernel de linux pueden manejar mas de 10Gib/s for a single stream
  el sistema es tan lento como la parte más lenta
  tener cuidado de que el bus no sea el bottleneck (pero suele ser bastante mayor). Traspa 6-5 de RH442.version.5.pdf

Posicionamiento electro-mecánico
  rotational delay
  seek time


Al hacer benchmarks de disco tenemos que tener cuidado de que no estemos usando el cache.

El disco tiene un lookahead (readahead es a nivel lógico, este es a nivel físico), cuando le mandas leer un bloque el lee los siguientes.

