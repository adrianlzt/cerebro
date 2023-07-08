# Memoria
Obtener memoria libre (en bytes):

import gc
gc.mem_free()


Lilygo camera v1.6.2
Sin nada cargado:
gc.mem_free() 2180080
gc.mem_alloc() 1360

Total: 2.1 MiB



# SPIRAM / psRAM
https://github.com/loboris/MicroPython_ESP32_psRAM_LoBo

SPIRAM (o psRAM): Psuedostatic RAM

ESP32 has a few hundred kilobytes of internal RAM, residing on the same die as the rest of the chip components. It can be insufficient for some purposes, so ESP32 has the ability to use up to 4 MB of virtual addresses for external PSRAM (Psuedostatic RAM) memory. The external memory is incorporated in the memory map and, with certain restrictions, is usable in the same way as internal data RAM.

Parece una especie de SWAP. Una memoria ram pero más lenta.


Firmware genérico de esp32 con spiram
https://micropython.org/download/esp32spiram/


Memoria libre / alloc con este build de spiram

gc.mem_free() 4096704
gc.mem_alloc() 1728
Total: 3.9 MiB
