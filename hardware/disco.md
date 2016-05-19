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



Testear velocidad
sudo hdparm -t /dev/sdb


# Boot
https://0xax.gitbooks.io/linux-insides/content/Booting/linux-bootstrap-1.html

On hard drives partitioned with an MBR partition layout, the boot sector is stored in the first 446 bytes of the first sector (which is 512 bytes). The final two bytes of the first sector are 0x55 and 0xaa, which signals the BIOS that this device is bootable

La imagen que aquí se encuentra sera el bootloader quien será quien continue con la carga del sistema.



# Geometria

Inicialmente los discos se nombraban en:
CHS - Cylinders, Heads, Sector

Ahora se usa LBA, porque CHS tiene limitación de 8GiB.

De todas maneras se puede seguir diciendo los valores en CHS, aunque no cumplan el estandar por tener mas de 1024 cilindros.

Un ejemplo, un disco de 238Gib tiene:
CHS= 3891 255 63
3891 * 255 * 63 = 62508915
Multiplicado por el logical sector, que suele ser 512bytes o 4KiB:
62508915 * 4096 = 256036515840
256036515840 / (1024)^3 = 238.45 GiB


Para convertir entre CHS y LBA:
(C x TH x TS) + (H x TS) + (S - 1) = LBA
Where:
C = the sector's Cylinder#
TH = the Total Heads of the hard drive according to the BIOS translation in effect
TS = the Total Sectors/Track of the hard drive
H = the sector's Head#
S = the sector's Sector#

(3891 * 255 * 63) +  (255 * 63) + (63 - 1)



# MBR, analisis hexadecimal
http://blog.creativeitp.com/posts-and-articles/bios/analysing-the-master-boot-record-mbr-with-a-hex-editor-hex-workshop/


# Herramientas de disco
Mirar en linux/filesystem/data_recover.md


# IOPS (http://www.mongodb.com/presentations/webinar-capacity-planning)
5.400 RPM                50-80
7.200 RPM                75-100
10.000 RPM               125-150
15.000 RPM               175-210
Amazon EBS/Provisioned   100, up to 2.000
Amazon SSD               9.000 - 120.000
Intel X25-E (SLC)        5.000
Fuion IO                 135.000
Violin Memory 6000       1.000.000
