https://www.thegeekdiary.com/understanding-linux-multipath-using-dm-multipath/
https://www.thegeekdiary.com/understanding-multipath-utility-to-configure-dm-multipath/


Esquema de una conexión entre un proveedor de discos (SAN) y un servidor, usando fibra:

               T
               A
               R        F                         F         H
               G        I                         I         O
               E        B                         B         S
      SAN      T        R         FCSWITCH        R         T    Server
o---------------o       E       +----------+      E        x-------+-------x
|               |               |          |=-------------=[H0]    |sda sdb|
|     LUN0   [P0]=-------------=|          |=-------------=[H1]    |sdc sdd|
|____________[P1]=-------------=|          |               |-------+       |
|            [P2]=-------------=|          |               |-------+       |
|     LUN1   [P3]=-------------=|          |=-------------=[H2]    |sdf sdg|
|               |               |          |=-------------=[H3]    |sdh sdi|
o---------------o               +----------+               x-------+-------x

                          HOST = HBA port (ex. H0, H1)
                   BUS/CHANNEL = N/A
                     TARGET/ID = SAN port (ex. P0, P1)
                           LUN = storage, disk, tape, etc. (ex. LUN0)

                                               SCSI
                      HOST  BUS TARGET LUN  DEV   ADDR
                      --------------------  ------------
                       H0    0    P0    0   sda  0:0:0:0
                       H0    0    P1    0   sdb  0:0:1:0
                       H1    0    P2    0   sdc  1:0:2:0
                       H1    0    P3    0   sdd  1:0:3:0

                       H2    0    P0    1   sde  2:0:0:1
                       H2    0    P1    1   sdf  2:0:1:1
                       H3    0    P2    1   sdg  3:0:2:1
                       H3    0    P3    1   sdh  3:0:3:1



Conexión de un servidor a los discos usando varios caminos.
Los servidores tendrán tarjetas HBA para conectarse a uno o varios SAN.
multipathd gestionará los caminos de cada block device a los LUN de la SAN.


SCSI:
  target: el que ofrece el disco
  initiator: el cliente que pide un bloque

HBA (host bus adaptar), una tarjeta de red para discos
Cada HBA puede tener varios puertos, y cada una de ellas serán un target.
Normalmente las HBA se conectan a un Fiber Channel (un switch de fibra, generalmente Brocade).
El protocolo de transporte podría ser iSCSI en vez de Fiber Channel (por ejemplo).

LUN path: los caminos entre WWN

WWN (o WWID): como una MAC, pero tiene un tipo, o initiator o target.

Zoning, es como una especie de iptables, donde especificamos quien se puede comunicar con que.
Esto se hace en los FiberChannel

El esquema sería:
 1. generar zoning
 2. escanear en target
 3. en target asignar discos
 4. escanear en initiator
 5. se ven los discos en destino


En el cliente, tendré, generalmente, un servidor con dos HBA, y el disco (ej.: sda) estará soportado por esas dos HBAs con sus dos caminos.



# multipath

En linux el demonio multipathd se encargará de crear virtual devices usando el "mapper" del kernel.
Para sacar la config haremos "multipath -ll"
Mirar más abajo para ver otras formas de sacar la info


Por lo que veo en "multipath -ll", linux crea un disco (sdX) por cada LUN path y todos se agregan en un device mapper (dm-N).
Si miramos lsblk, veremos que cada disco sdX tiene por debajo un mpath y debajo las particiones o volume groups (si usamos LVM)



La configuración puede ser activa-activa o activa-pasiva.

activa-activa: dos o más storage controllers pueden aceptar y procesar IO (todos los paths con la misma prioridad), ejemplo:
mpatha (3600601f0d057000018fc7845f46fe011) dm-1 DGC,RAID 0
size=98G features='1 queue_if_no_path' hwhandler='1 emc' wp=rw
`-+- policy='round-robin 0' prio=1 status=enabled
  |- 11:0:0:0 sdf 8:80  active ready running
  |- 10:0:0:0 sdc 8:32  active ready running
  |- 12:0:0:0 sdi 8:128 active ready running
  `- 13:0:0:0 sdl 8:176 active ready running


activa-pasiva: un controller acepta y procesa las peticiones y otro está en stand-by. El primario tendrá mayor prioridad que el secundario:
mpatha (3600601f0d057000018fc7845f46fe011) dm-1 DGC,RAID 0
size=98G features='1 queue_if_no_path' hwhandler='1 emc' wp=rw
|-+- policy='round-robin 0' prio=1 status=active
| |- 12:0:0:0 sdi 8:128 active ready running
| `- 13:0:0:0 sdl 8:176 active ready running
`-+- policy='round-robin 0' prio=0 status=enabled
  |- 11:0:0:0 sdf 8:80  active ready running
  `- 10:0:0:0 sdc 8:32  active ready running




## Explicación de los campos

CUIDADO! depende de la versión de multipath la salida puede variar de diversas formas. Mirar
https://github.com/tribe29/checkmk/blob/17fc393391837fe79901378f884016a3fbe505f1/checks/multipath


Ejemplo de salida:
36006016071434e00ba29415ec6f7d72b dm-6 DGC     ,VRAID
size=50G features='2 queue_if_no_path retain_attached_hw_handler' hwhandler='1 alua' wp=rw
|-+- policy='service-time 0' prio=50 status=active
| |- 1:0:0:5 sdg 8:96   active ready running
| `- 2:0:0:5 sds 65:32  active ready running
`-+- policy='service-time 0' prio=10 status=enabled
  |- 1:0:1:5 sdm 8:192  active ready running
  `- 2:0:1:5 sdy 65:128 active ready running


En la primera línea tenemos:
 - WWID (también podriámos tener algo tipo "mpathX (36006016071434e00ba29415ec6f7d72b) ...") (en /dev tendremos /dev/mapper/36006016071434e00ba29415ec6f7d72b, o /dev/mapper/mpathX[pM])
 - device name (en lsblk veremos que el MIN es "6", para este ejemplo). Tendremos /dev/dm-6 pero no debe usarse a nivel usario
 - vendor
 - product info

Segunda línea:
 - tamaño
 - enabled features
 - hardware handlers
 - write permissions

Después tendremos los path groups, por cada path group:
 - path selector algorithm (ejemplo: policy='service-time 0')
 - path group priority (ejemplo: prio=1). Hace falta pasar "-ll" para ver el valor de prio
 - path group state (ejemplo status=active)
      active - Path group currently receiving I/O requests.
      enabled - Path groups to try if the active path group has no paths in the ready state.
      disabled - Path groups to try if the active path group and all enabled path groups have no paths in the active state.
 - listados de los paths del path group (ejemplo: 1:0:1:5 sdm 8:192  active undef running)
   - SCSI information (HCIL): host, channel, scsi_id, and LUN (ejemplo: 1:0:1:5, mirar en el esquema del principio del documento el razonamiento dentrás de esta nomenclatura)
   - linux device name (ejemplo: sdm)
   - major a minor numbers (ejemplo: 8:192)
   - DM path and physical path state (ejemplo: active undef running)
       si usamos "-l" tendremos en el campo de en medio "undef", porque no se ha chequeado el path
       si usamos "-ll" tendremos en el campo de en medio "ready", si se ha chequeado y está correcto




## Monitorizacion
https://www.thegeekdiary.com/how-to-monitor-the-status-of-dm-multipathing-and-multipath-devices-path-groups-in-linux/

multipath -l
  quick overview of multipath topologies

multipath -ll
  it will also perform a check on all paths to see if it is active


multipathd nos permite sacar la información con otros formatos:
multipathd list paths format $format

Para ver que podemos poner en $format:
multipathd list wildcards


Obtener las LUNs, su estado y el dm-N asociado:
multipathd list multipaths raw format "%w %d %t"

Obtener el estado de los paths para cada LUN (cada path identificado por su sdX):
multipathd list paths format "%w %d %t %o %T"
multipathd list paths raw format "%w %d %t %o %T"
  sin cabecera


Estado en formato JSON:
multipathd list maps json
