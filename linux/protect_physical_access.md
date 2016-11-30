# Systemd - single user mode
https://access.redhat.com/solutions/1987833

Ficheros
/usr/lib/systemd/system/rescue*

Parece que por defecto necesita password



# Grub

https://wiki.archlinux.org/index.php/GRUB/Tips_and_tricks_(Espa%C3%B1ol)#Proteger_con_contrase.C3.B1a_el_men.C3.BA_de_GRUB
https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/System_Administrators_Guide/sec-GRUB_2_Password_Protection.html


Generar password:
grub-mkpasswd-pbkdf2

vi /etc/grub.d/40_custom
set superusers="USUARIO"
password_pbkdf2 USUARIO grub.pbkdf2.sha512.10000.D2F9E5...



Es un poco coñazo. Hay que meter la password en cada arranque.
