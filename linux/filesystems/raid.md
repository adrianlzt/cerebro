http://www.adaptec.com/en-us/_common/compatibility/_education/raid_level_compar_wp.htm


# Calculadora
https://access.redhat.com/labs/fslayoutcalculator/?sc_cid=70160000000e8Y3AAI&

This app is designed to help you determine optimal parameters for creating ext3/ext4/xfs file systems. When you input information about your current or planned storage, we'll generate a command to create a file system on given RAID storage. For creating LVM on RAID, please visit LVM RAID Calculator


# Check para mdadm
https://exchange.icinga.org/exchange/check_md_raid/files/661/check_md_raid.sh

Mira en /proc/mdstat


# Raid 0
Distribuye escrituras en varios discos, mejor throughput

# Raid 1
Replica los datos en todos los discos

# Raid 5
Las escrituras se hacen con Read-Modify-Write, requires two reads and two writes per write request. 
Costoso para la CPU si no va integrado en HW
Lectura, alto throughput

# Raid 6
Read-Modify-Write requires three reads and three writes per write request. No usar si no es por HW

