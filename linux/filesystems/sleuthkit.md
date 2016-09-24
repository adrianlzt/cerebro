http://wiki.sleuthkit.org/

apt-get install sleuthkit

arch:
pacman -S sleuthkit libewf


Interactuar con el sistema de ficheros sin llegar a montarlo.
mirar debugfs.md (para devices, /dev/sdax)

# GUI
http://www.sleuthkit.org/autopsy/
La versión de linux es vieja 2.x
La versión nueva es 4.x para windows

Nos permite crear un reporte mediante un formulario que nos va preguntando las cosas.
Le añadimos una imagen. La analiza y nos va preguntando que es cada partición para que le vayamos dando nombre y siga analizando.
autopsy hace llamadas a todas las herramientas de sleuthkit

yaourt -S autopsy

autopsy
Levanta un server web en: http://localhost:9999/autopsy

Si tenemos lvm mirar lvm.md

Una cosa muy útil es hacer una líenea del tiempo con las particiones que tengamos.


# Herramientas
## fsstat
http://www.sleuthkit.org/sleuthkit/man/fsstat.html
Display general details of a file system

## fls
Listar ficheros
sudo fls -plr /dev/sda1 | less
sudo fls –rd –m / /dev/mapper/VolGroup-lv_root

(echo "file_type|inode|file_name|mod_time|acc_time|chg_time|cre_time|size|uid|gid"; fls -l -m "/boot" -p -r /dev/loop2)| column -t -s "|"
  el echo es para poner cabecera
  mostrar version extendida -l
  full path (-p) y el punto de montaje poner somo si fuera /boot
  recursivo -r
  column para tabularlo correctamente

## ffind
Finds the name of the file or directory using a given inode

## ifind
Find the meta-data structure that has allocated a given disk unit or file name
sudo ifind /dev/sda1 -n "etc/passwd"

## icat
Output the contents of a file based on its inode number
sudo icat /dev/sda1 395528

## ils
List inode information

## istat
Display details of a meta-data structure
sudo istat /dev/sda1 395528



## mactime
http://wiki.sleuthkit.org/index.php?title=Mactime_output
http://svn.sleuthkit.org/repos/sleuthkit/tags/sleuthkit-3.0.0/docs/ref_timeline.txt

crear una linea temporal a partir de los dumps de ils o fls (usando el parámetro -m)

fecha   tamaño   macb  modo(permisos)   user  group  inode  nombre

podemos pasar un fichero /etc/groups o /etc/passwd para traducir los gid/uid en nombres

fls -l /dev/loop2 -m "/boot" -p -r | mactime -b -

## TestDisk
https://help.ubuntu.com/community/DataRecovery#Testdisk
http://www.sleuthkit.org/informer/sleuthkit-informer-15.txt

recuperar particiones cuando la tabla está rota


## Swap
srch_strings

me peta al usarlo:
*** Error in `srch_strings': double free or corruption (fasttop): 0x00000000008dd240 ***


# Conceptos
deleted-realloc
Se borró el fichero y el inodo ya está ocupado por otra cosa

