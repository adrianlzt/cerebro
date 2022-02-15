https://gist.github.com/dentex/8035c7d62279ae139e915e7f4f3dbe91
Clase de python para hacer debouncing con interrupciones.

Ejemplo eliminando bounces y distinguiendo entre single click y double click.
https://wdi.centralesupelec.fr/boulanger/MicroPython/ESP32BE3
Pero esto parece que primero detectará un single click y luego el double click.

Tal vez con dos callback, uno en rising y en otro en falling.

Para asyncio
https://github.com/peterhinch/micropython-async/blob/master/aswitch.py
https://forum.micropython.org/viewtopic.php?f=2&t=8447
