https://en.wikipedia.org/wiki/RAID


# Calculadora
https://access.redhat.com/labs/fslayoutcalculator/?sc_cid=70160000000e8Y3AAI&

This app is designed to help you determine optimal parameters for creating ext3/ext4/xfs file systems. When you input information about your current or planned storage, we'll generate a command to create a file system on given RAID storage. For creating LVM on RAID, please visit LVM RAID Calculator


# Check para mdadm
https://exchange.icinga.org/exchange/check_md_raid/files/661/check_md_raid.sh

Mira en /proc/mdstat
https://raid.wiki.kernel.org/index.php/Mdstat


# Raid 0 (círuclo, distribuye)
Distribuye escrituras en varios discos, mejor throughput
El espacio es la suma de los discos.
Si falla un disco nos quedamos sin datos

# Raid 1 (espejo)
Replica los datos en todos los discos
El espacio es la mitad de la suma de los discos
En caso de fallo de un disco podemos simplemente cambiarlo por otro y se copiará la información del disco bueno.
Raid 1 por sw puede que no permite hot-swap de un disco fallado

# Raid 5
El raid más común.
Distribución de bloques + paridad entre los discos.
Mínimos 3 discos hasta 16.
Las escrituras se hacen con Read-Modify-Write, requires two reads and two writes per write request. 
Costoso para la CPU si no va integrado en HW
Lectura, alto throughput.
Escritura penalizada.
Hacer el rebuild de los datos, en caso de discos grandes, puede tomar bastante tiempo, con el peligro que si durante ese tiempo otro disco falla nos quedamos sin datos.

# Raid 6
Distribución de bloques + doble paridad (nos permite fallo de dos discos)
Requiere mínimo 4 discos.
Read-Modify-Write requires three reads and three writes per write request. No usar si no es por HW
Write performance un 20% peor que raid 5

# Raid 0+1
El usuario ve un raid 1, y los discos son accedidos con raid 0.
Si falla un disco, tendremos que leer los discos del otro lado del raid 1 enteros, teniendo más riesgo de un fallo y pérdida total de los datos.
No usado

# Raid 1+0
El usuario ve un raid 0, los discos con accedidos con raid 1.
Rebuild rápido, solo hace falta copiar los datos de un disco a otro.
Cons, la mitad de la capacidad está usada para hacer mirroring.

Raid 2, 3 y 4 no usados.
