https://wiki.archlinux.org/index.php/samba
https://wiki.debian.org/SAMBAClientSetup
http://www.unixmen.com/standalone-samba-in-debian-squeeze/

# Server
apt-get install libcupsys2 samba samba-common
vi /etc/samba/smb.conf
...
[nombre]
	comment = Directorio para los backups de T4U
	path = /opt/nombre
	valid users = nombre
	writable = yes
	create mask = 0700
    	directory mask = 0700

service samba restart



# Cliente
pacman -S smbclient
apt install smbclient cifs-utils

Montar unidad remota:

findsmb -> buscar unidades compartidas por samba
smbtree -N -d3 -> mirar los directorios compartidos por cada maquina

smbclient -L <windows-box> -U% //Mirar lo que podemos montar
smbclient -L <windows-box> -U <username> //Mirar lo que puede montar mi usuario windows
sudo mount -t cifs -o username=<username>,password=<password> //<win-box>/<share> /mnt/<name-of-mountpoint>
sudo mount -t cifs "//<win-box>/<share unit>" /mnt/<name-of-mountpoint>

/etc/fstab:
//192.168.0.6/nombre /mnt/punto        smbfs           username=user,password=pass	0       0

Si no tenemos password, en vez de "username=user,password=pass" pondremos "guest"

Caracteres especiales: 
Using '\040' replace blank space character, and '\134' replaces backslash character


Montarlo con systemd
/etc/systemd/system/mnt-myshare.mount
[Unit]
Description=Mount Share at boot
Requires=systemd-networkd.service
After=network-online.target
Wants=network-online.target

[Mount]
What=//server/share
Where=/mnt/myshare
Options=credentials=/etc/samba/creds/myshare,iocharset=utf8,rw,x-systemd.automount
Type=cifs
TimeoutSec=30

[Install]
WantedBy=multi-user.target



## Nautilus
Control+l
smb://server/unidad



