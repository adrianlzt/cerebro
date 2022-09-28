# Editor grafico
sudo grub-customizer


# Centos
Modificar /etc/grub.conf
No hace falta ejecutar luego ningún comando

No tengo claro si no hace falta modificar nada.
Actualizar config con
grub2-mkconfig -o "$(readlink -e /etc/grub2.cfg)"
Esto modifica /boot/grub2/grub.cfg



/boot/config-3.13.8
  Configuración del kernel

/boot/grub2/grub.cfg
  Están las distintas configuraciones de arranque. Comienzan por "menuentry"
  En la línea linux /vmli... se meten las configuraciones de arranque.
  Este fichero se genera con update-grub o grub-mkconfig -o /boot/grub/grub.cfg


# Quitar timeout
/etc/default/grub
GRUB_TIMEOUT=0
grub-mkconfig -o /boot/grub/grub.cfg



# Definir el kernel por defecto
http://fedoraproject.org/wiki/GRUB_2/es

Abra /etc/default/grub y asegúrese de que existe esta línea:
  GRUB_DEFAULT=saved

Generar el fichero de conf de grub:
update-grub
o
grub-mkconfig -o /boot/grub/grub.cfg


grep ^menuentry /boot/grub2/grub.cfg | cut -d "'" -f2
  mostrar opciones

grub2-set-default <menu entry title>
  definir el que queremos que arranque por defecto

grub2-editenv list
  comprobar que es el elegido

/etc/default/grub
GRUB_DEFAULT=saved
  Aqui podemos definir el kernel que queremo que arranque, empezando por 0.
  'saved' es el último que arrancamos.
  No tocar directamente, ya que grub2-mkconfig lo sobreescribirá


Reinstalar grub (boot loader)
http://askubuntu.com/questions/126541/how-to-manually-install-boot-loader
grub-install --recheck --no-floppy --root-directory=/ /dev/sda


# Internals
https://0xax.gitbooks.io/linux-insides/content/Booting/linux-bootstrap-1.html

Primero se carga http://git.savannah.gnu.org/gitweb/?p=grub.git;a=blob;f=grub-core/boot/i386/pc/boot.S;hb=HEAD
Este salta a la imagen core de GRUB2

The core image begins with diskboot.img, which is usually stored immediately after the first sector in the unused space before the first partition. The above code loads the rest of the core image into memory, which contains GRUB 2's kernel and drivers for handling filesystems. After loading the rest of the core image, it executes grub_main.+



# Grub protected password
linux/protect_physical_access.md


# Grub cli
Arrancando desde USB

grub> root (hd0,0)   # first harddrive, first partition
grub> find /[tab]    # type the slash then press [tab], and it will try to list files on this partition
Error 17: Cannot mount selected partition   # Oops no file system here
grub> root (hd0,1)   # first harddrive, second partition
grub> find /[tab]
Possible files are: lost+found var etc media ...   # That was my hard drive with my linux install
grub> root (hd1,0)   # second hard drive usually is the USB drive if you have only one internal drive
grub> find /[tab]
 Possible files are: ldlinux.sys mydoc myfile mystick syslinux.cfg  # Bingo, that's the USB stick

Intentando arrancar de un usb netinstall con centos estaba en hd1,1.
Haciendo un cat /efi/boot/grub.cfg supe que era el netinstall.

Una vez tenemos seleccionado el "root", para arrancar ese:
chainloader +1
boot

Pero me decia que no era un disk bootable.


# Rescue
https://phoenixnap.com/kb/grub-rescue
