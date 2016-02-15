Depende de lo que lleve el .iso deberemos usar una u otra

Boton derecho sobre el raton, grabar a una unidad

# dd
dd if=/dev/sdX of=fichero.iso bs=512k

Si hacemos file fichero.iso debere salir algo tipo:
fichero.iso: DOS/MBR boot sector ISO 9660 CD-ROM filesystem data (DOS/MBR boot sector) 'LiveCD' (bootable); partition 1 : ID=0x17, active, start-CHS (0x0,2,1), end-CHS (0x3ff,192,32), startsector 64, 6324160 sectors; partition 2 : ID=0x1, start-CHS (0x3ff,192,32), end-CHS (0x3ff,192,32), startsector 6324224, 161152 sectors


# Unetbootin
http://unetbootin.sourceforge.net/

Si hacemos file fichero.iso debera salir algo tipo:
iso: ISO 9660 CD-ROM filesystem data 'NOMBRE' (bootable)


unetbootin

Nos permite meter varias distribuciones linux en el mismo pendrive.

Incluso nos da una lista de distribuciones. Seleccionamos, elegimos el pendrive y se crea la unidad bootable automaticamente.


Failed to load COM32 file menu.c32
https://bugs.launchpad.net/unetbootin/+bug/1190256

cp /usr/lib/syslinux/modules/bios/{menu.c32,libutil.c32} /media/adrian/pendrive
