RAM y Swap se agregan como memoria virtual y se divide en páginas.
Los procesos van reservando páginas y si no hay espacio o no se usan en un tiempo se llevan a swap (swap-out).
Si se reclama una página que está en swap, ocurre un fallo de página y se hace un swap-in (se devuelve a RAM)

http://www.slideshare.net/raghusiddarth/memory-management-in-linux-11551521

CPU registers ~1 ciclo
CPU cache (L1, L2, ...) 3-14 ciclos
RAM ~250 ciclos
Disk ~40.000.000 ciclos


En dmesg podemos ver el mapa de memoria ram que nos da la bios
BIOS-e820: [mem 0x0000000000000000-0x000000000009cbff] usable		-> 0x9cbff = 642.047
BIOS-e820: [mem 0x000000000009cc00-0x000000000009ffff] reserved
BIOS-e820: [mem 0x00000000000e0000-0x00000000000fffff] reserved
BIOS-e820: [mem 0x0000000000100000-0x00000000bb63efff] usable		-> 0xBB53EFFF = 3.142.840.319
BIOS-e820: [mem 0x00000000bb63f000-0x00000000bb6befff] reserved
BIOS-e820: [mem 0x00000000bb6bf000-0x00000000bb7befff] ACPI NVS
BIOS-e820: [mem 0x00000000bb7bf000-0x00000000bb7fefff] ACPI data
BIOS-e820: [mem 0x00000000bb7ff000-0x00000000bb7fffff] usable		-> 0xfff = 4.095
BIOS-e820: [mem 0x00000000bb800000-0x00000000bfffffff] reserved
BIOS-e820: [mem 0x00000000ffe00000-0x00000000ffffffff] reserved
...
BIOS-e820: [mem 0x0000000100000000-0x00000001fbffffff] usable		-> 0xFBFFFFFF = 4.227.858.431
BIOS-e820: [mem 0x00000001fc000000-0x00000001ffffffff] reserved
BIOS-e820: [mem 0x0000000200000000-0x000000023bffffff] usable		-> 0x3BFFFFFF = 1.006.632.959

642.047 + 3.142.840.319 + 4.095 + 4.227.858.431 + 1.006.632.959 = 8.377.977.851 bytes
free -b me da 8.161.107.968

Esta memoria disponible se divide en páginas de 4kB (~1M cada 4GB):
8.161.107.968 / 4096 = 1.992.458


Las aplicaciones reservan memoria VIRTUAL, que se mapea, mediante la tabla TLB, a páginas de memoria física y swap.

En sistemas de 32 bits tenemos 4GB direccionables, 3GB para userspace y 1GB para kernel.
En 64 bits, 256TB userspace y 256TB kernel

OOM killer se ejecutará en caso de poca memoria (ver oom.md)

Solo la "anonymous memory" se swapea.
