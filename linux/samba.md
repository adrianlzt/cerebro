# http://www.unixmen.com/standalone-samba-in-debian-squeeze/

# apt-get install libcupsys2 samba samba-common
# vi /etc/samba/smb.conf
...
[nombre]
	comment = Directorio para los backups de T4U
	path = /opt/nombre
	valid users = nombre
	writable = yes
	create mask = 0700
    	directory mask = 0700
# service samba restart


Montar unidad remota:

findsmb -> buscar unidades compartidas por samba
smbtree -N -d3 -> mirar los directorios compartidos por cada maquina

smbclient -L <windows-box> -U <username> //Mirar lo que puede montar mi usuario windows
mount -t smbfs -o username=<username>,password=<password> //<win-box>/<share> /mnt/<name-of-mountpoint>

/etc/fstab:
//192.168.0.6/nombre /mnt/punto        smbfs           username=user,password=pass	0       0

Caracteres especiales: 
Using '\040' replace blank space character, and '\134' replaces backslash character
