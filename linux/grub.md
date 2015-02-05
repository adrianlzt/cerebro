/boot/config-3.13.8
  Configuración del kernel

/boot/grub2/grub.cfg
  Están las distintas configuraciones de arranque. Comienzan por "menuentry"
  En la línea linux /vmli... se meten las configuraciones de arranque.



# Definir el kernel por defecto
http://fedoraproject.org/wiki/GRUB_2/es

Abra /etc/default/grub y asegúrese de que existe esta línea:
  GRUB_DEFAULT=saved

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
